type FullscreenVideo = HTMLVideoElement & {
  webkitEnterFullscreen?: () => void;
  webkitDisplayingFullscreen?: boolean;
};

export function isVideoFullscreen(video: HTMLVideoElement) {
  const player = video as FullscreenVideo;
  const fullscreen = document.fullscreenElement;
  return (
    fullscreen === video ||
    fullscreen?.contains(video) === true ||
    player.webkitDisplayingFullscreen === true
  );
}

export function setVideoAudible(video: HTMLVideoElement, audible: boolean) {
  video.muted = !audible;
  if (audible) video.volume = 1;
}

export function watchVideoFullscreen(
  video: HTMLVideoElement,
  onChange: (fullscreen: boolean) => void,
) {
  const sync = () => onChange(isVideoFullscreen(video));
  const begin = () => onChange(true);
  const end = () => onChange(false);
  document.addEventListener("fullscreenchange", sync);
  video.addEventListener("fullscreenchange", sync);
  video.addEventListener("webkitbeginfullscreen", begin);
  video.addEventListener("webkitendfullscreen", end);
  return () => {
    document.removeEventListener("fullscreenchange", sync);
    video.removeEventListener("fullscreenchange", sync);
    video.removeEventListener("webkitbeginfullscreen", begin);
    video.removeEventListener("webkitendfullscreen", end);
  };
}

export function enterVideoFullscreen(
  video: HTMLVideoElement,
  onAudible?: (audible: boolean) => void,
) {
  setVideoAudible(video, true);
  onAudible?.(true);
  const player = video as FullscreenVideo;
  const openNative = () => {
    if (typeof player.webkitEnterFullscreen !== "function") return false;
    player.webkitEnterFullscreen();
    return true;
  };
  if (!video.requestFullscreen) {
    if (!openNative()) {
      setVideoAudible(video, false);
      onAudible?.(false);
    }
    return;
  }
  void video.requestFullscreen().catch(() => {
    if (openNative()) return;
    setVideoAudible(video, false);
    onAudible?.(false);
  });
}

export type ProjectImage = {
  kind?: "image";
  src: string;
  thumb: string;
  alt: string;
  width: number;
  height: number;
};

export type ProjectVideo = {
  kind: "video";
  /** MP4 file, H.264 video and AAC audio, so it plays on iPhone and Android. */
  src: string;
  poster: string;
  thumb: string;
  alt: string;
  width: number;
  height: number;
};

export type ProjectSlide = ProjectImage | ProjectVideo;

export type Project = {
  slug: string;
  title: string;
  category: string;
  year?: string;
  summary: string;
  description: string;
  materials: string;
  scope: string;
  cover: ProjectImage;
  gallery: ProjectSlide[];
};

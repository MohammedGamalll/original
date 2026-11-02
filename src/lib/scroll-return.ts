import { normalizePath } from "@/lib/utils";

const returnKey = "original:return-scroll";
const skipIntroKey = "original:skip-intro";

export type ReturnPosition = {
  path: string;
  y: number;
};

export function saveReturnPosition() {
  const position: ReturnPosition = {
    path: window.location.pathname,
    y: window.scrollY,
  };
  sessionStorage.setItem(returnKey, JSON.stringify(position));
}

export function readReturnPosition(): ReturnPosition | null {
  const raw = sessionStorage.getItem(returnKey);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Partial<ReturnPosition>;
    if (typeof parsed.path !== "string" || typeof parsed.y !== "number") return null;
    return { path: parsed.path, y: parsed.y };
  } catch {
    return null;
  }
}

export function clearReturnPosition() {
  sessionStorage.removeItem(returnKey);
}

export function pathsMatch(left: string, right: string) {
  return normalizePath(left) === normalizePath(right);
}

export function markSkipIntro() {
  sessionStorage.setItem(skipIntroKey, "1");
}

export function shouldSkipIntro() {
  return sessionStorage.getItem(skipIntroKey) === "1";
}

export function clearSkipIntro() {
  sessionStorage.removeItem(skipIntroKey);
}

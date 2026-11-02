export type ProjectImage = {
  src: string;
  thumb: string;
  alt: string;
  width: number;
  height: number;
};

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
  gallery: ProjectImage[];
  /** Sample photography and copy, not a documented company project. */
  isPlaceholder: true;
};

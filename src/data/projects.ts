import type { Project, ProjectImage } from "@/types/project";

/**
 * Sample portfolio.
 * Every record is a placeholder: titles, years, descriptions, and photographs
 * are not documented ORIGINAL projects. Replace the files and this data together.
 * Photographs are Unsplash interiors prepared as local WebP files.
 */

const fallbackImage: ProjectImage = {
  src: "/images/fallback.webp",
  thumb: "/images/fallback.webp",
  alt: "",
  width: 1600,
  height: 1100,
};

function gallery(
  slug: string,
  alts: string[],
): { cover: ProjectImage; gallery: ProjectImage[] } {
  const images = alts.map((alt, index) => {
    const name = String(index + 1).padStart(2, "0");
    return {
      src: `/images/projects/${slug}/${name}.webp`,
      thumb: `/images/projects/${slug}/${name}-thumb.webp`,
      alt,
      width: 1600,
      height: 1100,
    };
  });

  return {
    cover: {
      src: `/images/projects/${slug}/cover.webp`,
      thumb: images[0]?.thumb ?? fallbackImage.thumb,
      alt: alts[0] ?? "",
      width: 1400,
      height: 960,
    },
    gallery: images,
  };
}

export const projects: Project[] = [
  {
    slug: "warm-space",
    title: "مساحة دافئة",
    category: "سكني",
    year: "٢٠٢٤",
    summary: "غرفة معيشة بنسب هادئة ولوحة من البيج والخشب والقماش الطبيعي.",
    description:
      "نموذج بصري لغرفة معيشة تعتمد على الفراغ المريح والإضاءة الدافئة. الترتيب هنا يوضح كيف يمكن لقطع الأثاث والخامات المحايدة أن تصنع إحساسًا بالاتساع من غير ضجيج بصري.",
    materials: "خشب طبيعي، قماش كتان، إضاءة دافئة",
    scope: "تصميم مساحة معيشة — محتوى نموذجي",
    isPlaceholder: true,
    ...gallery("warm-space", [
      "غرفة معيشة نموذجية بألوان دافئة وأريكة منخفضة",
      "جلسة معيشة نموذجية بإضاءة طبيعية وخشب فاتح",
      "ركن جلوس معاصر بخامات محايدة",
      "مقعد منجد وتفصيلة قماش داخل فراغ سكني نموذجي",
    ]),
  },
  {
    slug: "contemporary-details",
    title: "تفاصيل معاصرة",
    category: "مطبخ",
    year: "٢٠٢٤",
    summary: "مطبخ بخطوط واضحة وأسطح هادئة تُبرز الخامة قبل الزخرفة.",
    description:
      "نموذج لمطبخ معاصر يهتم بخط الخزائن، وملمس الأسطح، وعلاقة الإضاءة مع الرخام أو الخشب. الصور تعرض اتجاهًا بصريًا فقط، وليست توثيقًا لمطبخ تم تنفيذه.",
    materials: "أسطح حجرية، خشب، إضاءة خطية",
    scope: "تصميم مطبخ — محتوى نموذجي",
    isPlaceholder: true,
    ...gallery("contemporary-details", [
      "مطبخ معاصر نموذجي بخطوط بسيطة وإضاءة طبيعية",
      "مطبخ فاتح بأسطح ممتدة وخزائن هادئة",
      "تفصيلة سطح حجري داخل مطبخ نموذجي",
      "مطبخ بخشب دافئ وتكوين خزائن طولي",
    ]),
  },
  {
    slug: "material-balance",
    title: "توازن الخامات",
    category: "خامات",
    year: "٢٠٢٥",
    summary: "حوار بين القماش والحجر والخشب داخل لوحة لونية واحدة.",
    description:
      "هذه المجموعة النموذجية تجمع لقطات تُظهر كيف تتجاوز الخامات عندما تبقى الألوان قريبة من بعض. الهدف هو اختبار التوازن البصري، لا عرض مشروع منفَّذ.",
    materials: "حجر، خشب، قماش، معدن مطفي",
    scope: "تنسيق خامات — محتوى نموذجي",
    isPlaceholder: true,
    ...gallery("material-balance", [
      "ستائر وقماش ناعم داخل فراغ محايد نموذجي",
      "فراغ داخلي معاصر يبرز الخط المعماري والخامة",
      "تكوين داخلي هادئ بتفاصيل قماش وخشب",
      "ركن معيشي يوازن بين الإضاءة والألوان الترابية",
    ]),
  },
  {
    slug: "visual-calm",
    title: "هدوء بصري",
    category: "غرف",
    year: "٢٠٢٥",
    summary: "غرفة نوم مختصرة، ضوء ناعم، وألوان تمنح المكان سكونًا.",
    description:
      "نموذج لغرفة نوم يقلل العناصر ويترك للفراش والإضاءة والخلفية المحايدة تكوين الصورة. النصوص والصور عينات لحين تصوير غرف حقيقية.",
    materials: "أقمشة ناعمة، خشب فاتح، جدران محايدة",
    scope: "تصميم غرفة نوم — محتوى نموذجي",
    isPlaceholder: true,
    ...gallery("visual-calm", [
      "غرفة نوم نموذجية بألوان فاتحة وفراش منخفض",
      "غرفة نوم هادئة بإضاءة جانبية ناعمة",
      "فراش أبيض وتفصيلة غرفة نموذجية مختصرة",
      "غرفة نوم مضيئة بتكوين بسيط",
    ]),
  },
  {
    slug: "natural-home",
    title: "منزل بتفاصيل طبيعية",
    category: "سكني",
    year: "٢٠٢٥",
    summary: "بيت نموذجي تدخل فيه المواد الطبيعية في الجلسة والمطبخ والضوء.",
    description:
      "مجموعة صور سكنية دافئة توضح اتجاه المنزل الطبيعي: خشب ظاهر، ألوان قريبة من الرمل، وإضاءة نهارية. ليست صورًا لمنزل عميل.",
    materials: "خشب، حجر دافئ، ألوان رملية",
    scope: "تصميم سكني — محتوى نموذجي",
    isPlaceholder: true,
    ...gallery("natural-home", [
      "جلسة سكنية فاخرة نموذجية بألوان محايدة",
      "فراغ معيشي مفتوح بإضاءة طبيعية",
      "غرفة معيشة دافئة بتفاصيل خشب وقماش",
      "مطبخ سكني نموذجي بخامات طبيعية",
    ]),
  },
  {
    slug: "architectural-lines",
    title: "خطوط معمارية",
    category: "عمارة داخلية",
    year: "٢٠٢٥",
    summary: "خطوط السقف والفتحات والدرج تشكل الشخصية قبل الأثاث.",
    description:
      "نموذج يهتم بالهيكل الداخلي: الفتحات، والسلم، وارتفاع الفراغ، وعلاقة الكتلة بالضوء. الصور معمارية عامة وليست لمشروع منفذ باسم الشركة.",
    materials: "حجر، جص، خشب، زجاج",
    scope: "دراسة خطوط الفراغ — محتوى نموذجي",
    isPlaceholder: true,
    ...gallery("architectural-lines", [
      "فراغ داخلي معماري نموذجي بخطوط طولية وإضاءة علوية",
      "تكوين معماري داخلي بفتحات وضوء طبيعي",
      "واجهة منزل معاصر بخطوط أفقية هادئة",
      "منزل نموذجي يبرز العلاقة بين الكتلة والضوء",
    ]),
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getNextProject(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug);
  if (index < 0) return projects[0];
  return projects[(index + 1) % projects.length];
}

export { fallbackImage };

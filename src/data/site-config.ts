export type SiteConfig = {
  brandName: string;
  description: string;
  /** Production origin, including protocol, once the domain is known. Example: https://example.com */
  domain: string;
  phone: string;
  /** Full WhatsApp link, for example https://wa.me/201000000000 */
  whatsappUrl: string;
  /** WhatsApp chat with a project-start message ready to send. */
  startProjectUrl: string;
  email: string;
  address: string;
  /** External map link opened from the location section. */
  mapUrl: string;
  /** Embeddable map URL for the location iframe. */
  mapEmbedUrl: string;
  social: {
    instagram: string;
    facebook: string;
  };
  placeholderNotice: string;
};

const address = "١ شارع مصطفي النحاس تقاطع شارع عباس العقاد مدينة نصر";
const mapQuery = encodeURIComponent(address);
const whatsappNumber = "201108110396";
const startProjectMessage = "السلام عليكم، حابب أبدأ مشروع مع ORIGINAL.";

/**
 * Editable company information.
 * Contact values below were supplied for the public site.
 */
export const siteConfig: SiteConfig = {
  brandName: "ORIGINAL",
  description:
    "ORIGINAL استوديو للتصميم الداخلي والديكور والتشطيبات. نصنع مساحات تجمع بين الراحة والجمال والاهتمام بالتفاصيل.",
  domain: "",
  phone: "01108110396",
  whatsappUrl: `https://wa.me/${whatsappNumber}`,
  startProjectUrl: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(startProjectMessage)}`,
  email: "info@original-decor.com",
  address,
  mapUrl: `https://www.google.com/maps/search/?api=1&query=${mapQuery}`,
  mapEmbedUrl: `https://maps.google.com/maps?q=${mapQuery}&z=16&hl=ar&output=embed`,
  social: {
    instagram: "",
    facebook: "",
  },
  placeholderNotice:
    "الصور والنصوص في هذا المعرض نماذج بصرية، وليست أعمالًا موثّقة للشركة.",
};

export const navItems = [
  { href: "/", label: "الرئيسية" },
  { href: "/#about", label: "عن الشركة" },
  { href: "/#services", label: "خدماتنا" },
  { href: "/projects/", label: "أعمالنا" },
  { href: "/#process", label: "رحلة العمل" },
  { href: "/#contact", label: "تواصل معنا" },
] as const;

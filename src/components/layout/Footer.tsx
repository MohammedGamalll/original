import Image from "next/image";
import Link from "next/link";
import { BackToTop } from "@/components/layout/BackToTop";
import { Container } from "@/components/ui/Container";
import { navItems, siteConfig } from "@/data/site-config";

export function Footer() {
  const year = new Date().getFullYear();
  const contacts = [
    siteConfig.phone ? { href: `tel:${siteConfig.phone}`, label: siteConfig.phone } : null,
    siteConfig.email ? { href: `mailto:${siteConfig.email}`, label: siteConfig.email } : null,
    siteConfig.whatsappUrl ? { href: siteConfig.whatsappUrl, label: "واتساب" } : null,
  ].filter((item) => item !== null);

  const socials = [
    siteConfig.social.instagram ? { href: siteConfig.social.instagram, label: "إنستغرام" } : null,
    siteConfig.social.facebook ? { href: siteConfig.social.facebook, label: "فيسبوك" } : null,
  ].filter((item) => item !== null);

  return (
    <footer className="bg-ink text-ivory">
      <Container className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Image src="/brand/seal2.png" alt="" width={84} height={84} className="mb-6" />
          <p className="font-display text-3xl tracking-[0.14em]">ORIGINAL</p>
          <p className="mt-4 max-w-sm text-ivory/80">
            نصمم مساحات تجمع بين الراحة والجمال والاهتمام بكل تفصيلة.
          </p>
        </div>
        <div className="lg:col-span-3">
          <p className="mb-4 text-sm text-sand">التنقل</p>
          <ul className="grid gap-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-ivory/85 transition-colors hover:text-sand">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-4">
          {contacts.length > 0 ? (
            <>
              <p className="mb-4 text-sm text-sand">التواصل</p>
              <ul className="grid gap-2">
                {contacts.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="text-ivory/85 transition-colors hover:text-sand"
                      {...(item.href.startsWith("http")
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p className="max-w-xs text-ivory/75">بيانات التواصل تُضاف من إعدادات الموقع عند توفرها.</p>
          )}
          {socials.length > 0 ? (
            <ul className="mt-6 flex flex-wrap gap-4">
              {socials.map((item) => (
                <li key={item.href}>
                  <a href={item.href} target="_blank" rel="noopener noreferrer" className="hover:text-sand">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </Container>
      <Container className="flex flex-wrap items-center justify-between gap-4 border-t border-ivory/15 py-6 text-sm text-ivory/70">
        <p>© {year} ORIGINAL</p>
        <BackToTop />
      </Container>
    </footer>
  );
}

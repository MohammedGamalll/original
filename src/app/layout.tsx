import type { Metadata } from "next";
import { El_Messiri, Tajawal } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ScrollRestorer } from "@/components/layout/ScrollRestorer";
import { siteConfig } from "@/data/site-config";
import "./globals.css";

const elMessiri = El_Messiri({
  subsets: ["arabic", "latin"],
  weight: "600",
  display: "swap",
  variable: "--font-el-messiri",
  preload: true,
  fallback: ["Noto Naskh Arabic", "serif"],
  adjustFontFallback: false,
});

const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-tajawal",
  preload: true,
  fallback: ["Segoe UI", "Tahoma", "sans-serif"],
  adjustFontFallback: false,
});

const title = "ORIGINAL — فن التصميم والديكور";

export const metadata: Metadata = {
  title: {
    default: title,
    template: "%s — ORIGINAL",
  },
  description: siteConfig.description,
  applicationName: siteConfig.brandName,
  ...(siteConfig.domain
    ? {
        metadataBase: new URL(siteConfig.domain),
        alternates: { canonical: siteConfig.domain },
      }
    : {}),
  openGraph: {
    title,
    description: siteConfig.description,
    locale: "ar_AR",
    type: "website",
    siteName: siteConfig.brandName,
    ...(siteConfig.domain ? { url: siteConfig.domain } : {}),
  },
  twitter: {
    card: "summary",
    title,
    description: siteConfig.description,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${elMessiri.variable} ${tajawal.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col font-sans text-ink" suppressHydrationWarning>
        <a className="skip-link" href="#content">
          تخطي إلى المحتوى
        </a>
        <Header />
        <ScrollRestorer />
        <main id="content" className="flex-1 pt-[var(--header-height)]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import "./globals.css";

const SITE_URL = "https://colegoodwinmusic.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Cole Goodwin | Country Artist from Pooler, Georgia",
    template: "%s | Cole Goodwin",
  },
  description:
    "The official site of country artist Cole Goodwin. New EP, Howdy, out June 26, 2026. Tour dates, music, videos and more.",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    siteName: "Cole Goodwin",
    url: SITE_URL,
    title: "Cole Goodwin | Country Artist from Pooler, Georgia",
    description:
      "The official site of country artist Cole Goodwin. New EP, Howdy, out June 26, 2026. Tour dates, music, videos and more.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cole Goodwin | Country Artist from Pooler, Georgia",
    description:
      "The official site of country artist Cole Goodwin. New EP, Howdy, out June 26, 2026. Tour dates, music, videos and more.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: SITE_URL,
  },
  other: {
    "theme-color": "#493629",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <Script id="gtm-init" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-57H5TG35');`}
      </Script>
      <body className="min-h-full flex flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:bg-rust focus:px-4 focus:py-2 focus:text-cream focus:shadow-lg"
        >
          Skip to main content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MusicGroup",
              name: "Cole Goodwin",
              url: SITE_URL,
              description:
                "Country artist from Pooler, Georgia. Signed to Big Machine Records. New EP, Howdy, out June 26, 2026.",
              genre: "Country",
              image: `${SITE_URL}/og-image.png`,
              sameAs: [
                "https://www.instagram.com/colegoodwinmusic/",
                "https://www.facebook.com/ColeGoodwinMusic/",
                "https://www.tiktok.com/@colegoodwinmusic",
                "https://www.youtube.com/@ColeGoodwinMusic",
                "https://open.spotify.com/artist/1BJuLsavR5ekNDC4FhjTmF",
                "https://music.apple.com/us/artist/cole-goodwin/1674367221",
              ],
              album: {
                "@type": "MusicAlbum",
                name: "Howdy",
                albumProductionType: "https://schema.org/StudioAlbum",
                datePublished: "2026-06-26",
              },
            }),
          }}
        />
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-57H5TG35"
            title="Google Tag Manager"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <Header />
        <PageTransition>{children}</PageTransition>
        <Footer />
      </body>
    </html>
  );
}

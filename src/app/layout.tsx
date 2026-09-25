import type { Metadata } from "next";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import Splash from "@/components/Splash";
import { SPLASH_KEY, isCloserOut } from "@/lib/release";
import AnchorScroll from "@/components/shared/AnchorScroll";
import CookieConsent from "@/components/consent/CookieConsent";
import TermsGate from "@/components/consent/TermsGate";
import "./globals.css";

const SITE_URL = "https://colegoodwinmusic.com";

// Re-render every route at most hourly so the splash flips from pre-save to
// "out now" on release day without a deploy. See src/lib/release.ts.
export const revalidate = 3600;

// Read before paint so a visitor who already entered this session never sees
// the splash flash, and a deep link to /legal is never gated.
const splashScript = `try{var e=document.documentElement;if(sessionStorage.getItem('${SPLASH_KEY}')){e.classList.add('splash-entered')}else if(location.pathname.indexOf('/legal')===0){e.classList.add('splash-exempt')}}catch(err){}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Cole Goodwin | Country Artist from Pooler, Georgia",
    template: "%s | Cole Goodwin",
  },
  description:
    "The official site of country artist Cole Goodwin. New EP, Howdy, out now. Tour dates, music, videos and more.",
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
      "The official site of country artist Cole Goodwin. New EP, Howdy, out now. Tour dates, music, videos and more.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cole Goodwin | Country Artist from Pooler, Georgia",
    description:
      "The official site of country artist Cole Goodwin. New EP, Howdy, out now. Tour dates, music, videos and more.",
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
    // suppressHydrationWarning: the splash script below mutates the class list
    // before React hydrates, so server and client markup intentionally differ.
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: splashScript }} />
        <link rel="stylesheet" href="https://use.typekit.net/iln0apa.css" />
        {/* Calluna + Rafaella, the label's type for "Closer Every Day". */}
        <link rel="stylesheet" href="https://use.typekit.net/gjg0aoa.css" />
      </head>
      <Script id="gtm-init" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-57H5TG35');`}
      </Script>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        {/* Splash must be the first child of <body> so it exists on first
            paint. Shown once per browser session; never on /legal routes. */}
        <Splash released={isCloserOut()} />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:bg-rust focus:px-4 focus:py-2 focus:text-cream focus:shadow-lg"
        >
          Skip to main content
        </a>
        <AnchorScroll />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MusicGroup",
              name: "Cole Goodwin",
              url: SITE_URL,
              description:
                "Country artist from Pooler, Georgia. Signed to Big Machine Records. New EP, Howdy, out now.",
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
        {/* Cookie consent banner. Held back until the visitor enters past the
            splash; persisted in localStorage; injects nothing before consent
            is granted. */}
        <CookieConsent />
        {/* Arbitration / class-action notice, shown once right after the
            cookie decision so it is never buried only in the footer. */}
        <TermsGate />
      </body>
    </html>
  );
}

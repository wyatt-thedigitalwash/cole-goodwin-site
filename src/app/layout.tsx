import type { Metadata } from "next";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cole Goodwin",
  description:
    "The official site of country artist Cole Goodwin. New EP, Howdy, out June 26, 2026.",
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
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-57H5TG35"
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

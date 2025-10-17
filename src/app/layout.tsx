// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
// import HydrationFix from "@/components/HydrationFix";
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const GTM_ID = "GTM-W9W9X4QJ";

export const metadata: Metadata = {
  title: "Data Science Bootcamp - Learn at ₹5,000 | Greycampus",
  description:
    "Master data science in 20 weeks. ₹5,000 bootcamp with 95% placement. Expert instructors, real-world projects, lifetime access.",
  keywords:
    "data science bootcamp, affordable courses, career transformation, machine learning, python, SQL, data analysis",
  authors: [{ name: "Greycampus" }],
  creator: "Greycampus",
  publisher: "Greycampus",
  metadataBase: new URL("https://www.greycampus.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Data Science Bootcamp - Learn at ₹5,000 | Greycampus",
    description:
      "Master data science in 20 weeks. ₹5,000 bootcamp with 95% placement. Expert instructors, real-world projects, lifetime access.",
    url: "https://www.greycampus.com/",
    siteName: "Greycampus",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Greycampus Data Science Bootcamp",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Data Science Bootcamp - Learn at ₹5,000 | Greycampus",
    description:
      "Master data science in 20 weeks. ₹5,000 bootcamp with 95% placement. Expert instructors, real-world projects, lifetime access.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Favicons and Preconnects */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />

        {/* Google Tag Manager Head Script */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `}
        </Script>

        {/* Meta Pixel Script */}
        <Script id="meta-pixel-base" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window,document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '857891842493451');
            fbq('track', 'PageView');
          `}
        </Script>
      </head>
      <body className="font-sans antialiased">
        {/* GTM NoScript Fallback */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        {/* Meta Pixel NoScript fallback */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=857891842493451&ev=PageView&noscript=1"
            alt="facebook-pixel"
          />
        </noscript>
       
        {children}
        
        <Toaster />
      </body>
    </html>
  );
}

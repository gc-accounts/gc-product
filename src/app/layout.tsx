import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Data Science Bootcamp - Learn at 1/3 the Cost | Greycampus",
  description: "Master data science in 20 weeks. ₹5,000 bootcamp with 95% placement. Expert instructors, real-world projects, lifetime access.",
  keywords: "data science bootcamp, affordable courses, career transformation, machine learning, python, SQL, data analysis",
  authors: [{ name: "Greycampus" }],
  creator: "Greycampus",
  publisher: "Greycampus",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://greycampus.com"),
  alternates: {
    canonical: "/data-science-bootcamp",
  },
  openGraph: {
    title: "Data Science Bootcamp - Learn at 1/3 the Cost | Greycampus",
    description: "Master data science in 20 weeks. ₹5,000 bootcamp with 95% placement. Expert instructors, real-world projects, lifetime access.",
    url: "https://greycampus.com/data-science-bootcamp",
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
    title: "Data Science Bootcamp - Learn at 1/3 the Cost | Greycampus",
    description: "Master data science in 20 weeks. ₹5,000 bootcamp with 95% placement. Expert instructors, real-world projects, lifetime access.",
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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <style dangerouslySetInnerHTML={{
          __html: `
            * {
              word-break: normal !important;
              overflow-wrap: break-word !important;
              white-space: normal !important;
            }
            p, span, div {
              word-break: normal !important;
              overflow-wrap: break-word !important;
              white-space: normal !important;
            }
            .break-normal {
              word-break: normal !important;
              overflow-wrap: normal !important;
            }
          `
        }} />
      </head>
      <body className="font-sans antialiased">
        {children}
        <Toaster/>
      </body>
    </html>
  );
}

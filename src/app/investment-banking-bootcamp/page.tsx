import React from 'react'
import IbfoBootcamp from '@/components/pages/IbfoBootcamp';
import type { Metadata } from 'next'
export const metadata: Metadata = {
  title: "Invest Banking Bootcamp - Learn at ₹5,000 | Greycampus",
  description:
    "Master Invest Banking & Finance Operations in 20 weeks. ₹5,000 bootcamp with 95% placement. Expert instructors, real-world projects, lifetime access.",
  keywords: [
    "Investment Banking course",
    "Finance Operations training",
    "OdinSchool elite course",
    "live finance classes",
    "hands-on finance projects",
    "hiring sprints",
    "trade lifecycle",
    "KYC AML course",
    "NAV reconciliation training",
    "finance career support",
  ],
  authors: [{ name: "Greycampus" }],
  creator: "Greycampus",
  publisher: "Greycampus",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://www.greycampus.com"),
  alternates: { canonical: "/investment-banking-bootcamp" },
  openGraph: {
    title: "Invest Banking Bootcamp - Learn at ₹5,000 | Greycampus",
    description:
     "Master Invest Banking & Finance Operations in 20 weeks. ₹5,000 bootcamp with 95% placement. Expert instructors, real-world projects, lifetime access.",
    url: "https://www.greycampus.com/investment-banking-bootcamp",
    siteName: "Greycampus",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Greycampus Investment Banking Bootcamp",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Invest Banking Bootcamp - Learn at ₹5,000 | Greycampus",
    description:
     "Master Invest Banking & Finance Operations in 20 weeks. ₹5,000 bootcamp with 95% placement. Expert instructors, real-world projects, lifetime access.",
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


const page = () => {
  return (
    <>
       <IbfoBootcamp />
    </>
   
  );
};

export default page;

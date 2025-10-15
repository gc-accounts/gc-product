import React from 'react'
import TermsOfUse from '@/components/pages/PrivacyPolicy'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Privacy Policy | Greycampus",
  description:
    "We at GreyCampus respect your right to privacy. Find all the information related to our privacy policy here.",
  keywords:
    "data science bootcamp, affordable courses, career transformation, machine learning, python, SQL, data analysis",
  authors: [{ name: "Greycampus" }],
  creator: "Greycampus",
  publisher: "Greycampus",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://www.greycampus.com"),
  alternates: { canonical: "/privacyPolicy" },
  openGraph: {
    title: "Privacy Policy | Greycampus",
    description:
      "We at GreyCampus respect your right to privacy. Find all the information related to our privacy policy here.",
    url: "https://www.greycampus.com/privacyPolicy",
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
    title: "Privacy Policy | Greycampus",
    description:
      "We at GreyCampus respect your right to privacy. Find all the information related to our privacy policy here.",
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
       <TermsOfUse />
    </>
   
  );
};

export default page;
import React from 'react'
import TermsOfUse from '@/components/pages/TermsOfUse'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Terms of Use | Greycampus",
  description:
    "Find all the information related to our terms of use here, including the website usage, content, links, cancellation policy, and more.",
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
  alternates: { canonical: "/termsOfUse" },
  openGraph: {
    title: "Terms of Use | Greycampus",
    description:
      "Find all the information related to our terms of use here, including the website usage, content, links, cancellation policy, and more.",
    url: "https://www.greycampus.com/termsOfUse",
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
    title: "Terms of Use | Greycampus",
    description:
      "Find all the information related to our terms of use here, including the website usage, content, links, cancellation policy, and more.",
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
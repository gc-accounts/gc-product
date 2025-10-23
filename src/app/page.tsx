import React from 'react'
import Home from '@/components/pages/Home'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "High-Impact Internship cum Training (IcT) Programs | Greycampus",
  description: "Partner with GreyCampus to embed cutting-edge Data Science and AI expertise in your students, ensuring high-value career outcome",
  keywords: "GreyCampus, affordable courses, career transformation, machine learning, python, SQL, data analysis",
  authors: [{ name: "Greycampus" }],
  creator: "Greycampus",
  publisher: "Greycampus",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://www.greycampus.com"),
  alternates: { canonical: "/" },
  openGraph: {
    title: "High-Impact Internship cum Training (IcT) Programs | Greycampus",
    description: "Partner with GreyCampus to embed cutting-edge Data Science and AI expertise in your students, ensuring high-value career outcome",
    url: "https://www.greycampus.com/",
    siteName: "Greycampus",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Greycampus",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "High-Impact Internship cum Training (IcT) Programs | Greycampus",
    description: "Partner with GreyCampus to embed cutting-edge Data Science and AI expertise in your students, ensuring high-value career outcome",
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
       <Home />
    </>
   
  );
};

export default page;
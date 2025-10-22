import React from 'react'
import Home from '@/components/pages/Home'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "GreyCampus - Learn at ₹5,000 | Greycampus",
  description:
    "Master data science in 20 weeks. ₹5,000 bootcamp with 95% placement. Expert instructors, real-world projects, lifetime access.",
  keywords:
    "GreyCampus, affordable courses, career transformation, machine learning, python, SQL, data analysis",
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
    title: "GreyCampus - Learn at ₹5,000 | Greycampus",
    description:
      "Master data science in 3-months. ₹5,000 bootcamp with 100% placement assistance. Expert instructors, real-world projects.",
    url: "https://www.greycampus.com/",
    siteName: "Greycampus",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Greycampus GreyCampus",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GreyCampus - Learn at ₹5,000 | Greycampus",
    description:
      "Master data science in 3-months. ₹5,000 bootcamp with 100% placement assistance. Expert instructors, real-world projects.",
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
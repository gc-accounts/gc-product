import React from 'react'
import Corporate from '@/components/pages/Corporate'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Upskilling Professionals with Outcome-Driven Training Solutions | Boost Efficiency and Performance | Greycampus",
  description:
    "Upskill professionals with outcome-driven training solutions. Customized programs in new hire training, executive upskilling, leadership training, and more. Winner of Deloitte Fastest 50 Awards.",
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
  alternates: { canonical: "/corporate" },
  openGraph: {
    title: "Upskilling Professionals with Outcome-Driven Training Solutions | Boost Efficiency and Performance | Greycampus",
    description:
      "Upskill professionals with outcome-driven training solutions. Customized programs in new hire training, executive upskilling, leadership training, and more. Winner of Deloitte Fastest 50 Awards.",
    url: "https://www.greycampus.com/corporate",
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
    title: "Upskilling Professionals with Outcome-Driven Training Solutions | Boost Efficiency and Performance | Greycampus",
    description:
      "Upskill professionals with outcome-driven training solutions. Customized programs in new hire training, executive upskilling, leadership training, and more. Winner of Deloitte Fastest 50 Awards.",
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
       <Corporate />
    </>
   
  );
};

export default page;
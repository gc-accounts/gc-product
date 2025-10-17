import React from 'react'
import AboutUs from '@/components/pages/AboutUs'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "About Us | Greycampus",
  description:
    "About us Upskilling Professionals to Enable Growth, Productivity and Efficiency  About us At GreyCampus, we believe that every organisation should be able to skill up their workforce effectively in a professional&nbsp; effective, and affordable manner. With that in mind, we have set out to create the world&#8217;s best-value platform where learners can access high-quality online courses, [&hellip;]",
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
  alternates: { canonical: "/about-us" },
  openGraph: {
    title: "About Us | Greycampus",
    description:
      "About us Upskilling Professionals to Enable Growth, Productivity and Efficiency  About us At GreyCampus, we believe that every organisation should be able to skill up their workforce effectively in a professional&nbsp; effective, and affordable manner. With that in mind, we have set out to create the world&#8217;s best-value platform where learners can access high-quality online courses, [&hellip;]",
    url: "https://www.greycampus.com/about-us",
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
    title: "About Us | Greycampus",
    description:
      "About us Upskilling Professionals to Enable Growth, Productivity and Efficiency  About us At GreyCampus, we believe that every organisation should be able to skill up their workforce effectively in a professional&nbsp; effective, and affordable manner. With that in mind, we have set out to create the world&#8217;s best-value platform where learners can access high-quality online courses, [&hellip;]",
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
       <AboutUs />
    </>
   
  );
};

export default page;
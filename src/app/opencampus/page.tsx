// src/app/opencampus/page.tsx
import React, { Suspense } from "react";
import OpenCampusListing from "@/components/pages/OpenCampusListing";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "OpenCampus - GreyCampus",
  description: "The largest resource library on professional certifications from GreyCampus OpenCampus.",
  keywords: "OpenCampus, Blog, GreyCampus, Certification, Resource Library",
  authors: [{ name: "GreyCampus" }],
  creator: "GreyCampus",
  publisher: "GreyCampus",
  metadataBase: new URL("https://www.greycampus.com"),
  alternates: { canonical: "/opencampus" },
  openGraph: {
    title: "OpenCampus - GreyCampus",
    description: "The largest resource library on professional certifications.",
    url: "https://www.greycampus.com/opencampus",
    siteName: "GreyCampus",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "OpenCampus - GreyCampus",
    description: "The largest resource library on professional certifications.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Server-side fetch for initial OpenCampus blogs
async function getInitialOpenCampusBlogs() {
  const pageSize = 10; // Fetch the first 10 blogs at build time
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_ENDPOINT}/api/open-campus-blogs?pagination[page]=1&pagination[pageSize]=${pageSize}&populate=*&timestamp=${Date.now()}`,
    { next: { revalidate: 60 } }
  );
  if (!res.ok) throw new Error("Failed to fetch OpenCampus blogs");
  return res.json();
}

export default async function OpenCampusPage() {
  const data = await getInitialOpenCampusBlogs();
  const initialBlogs = data.data || [];
  const totalPages = data.meta.pagination.pageCount;

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-800">
      <Navigation currentPage="opencampus" />
      <main className="mt-16">
        <Suspense fallback={<div className="flex justify-center py-20 text-[#0c868d]">Loading...</div>}>
          <OpenCampusListing initialBlogs={initialBlogs} totalPages={totalPages} />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
import React, { Suspense } from "react";
import BlogListing from "@/components/pages/BlogListing";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog - GreyCampus",
  description: "GreyCampus Blog: professional certification, PMP, Six Sigma, ITIL and more.",
  keywords: "Blog, GreyCampus, Certification, PMP, Six Sigma, ITIL",
  authors: [{ name: "GreyCampus" }],
  creator: "GreyCampus",
  publisher: "GreyCampus",
  metadataBase: new URL("https://www.greycampus.com"),
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog - GreyCampus",
    description: "Professional certification blog covering PMP, Six Sigma, ITIL and more.",
    url: "https://www.greycampus.com/blog",
    siteName: "GreyCampus",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog - GreyCampus",
    description: "Professional certification blog covering PMP, Six Sigma, ITIL and more.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Server-side fetch for initial blogs
async function getInitialBlogs() {
  const pageSize = 10;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_ENDPOINT}/api/blogs?pagination[page]=1&pagination[pageSize]=${pageSize}&timestamp=${Date.now()}`,
    { next: { revalidate: 60 } }
  );
  if (!res.ok) throw new Error("Failed to fetch blogs");
  return res.json();
}

export default async function BlogPage() {
  const data = await getInitialBlogs();
  const initialBlogs = data.data || [];
  const totalPages = data.meta.pagination.pageCount;

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-800">
      <Navigation currentPage="blog" />
      <main className="mt-16">
        <Suspense fallback={<div className="flex justify-center py-20 text-[#0c868d]">Loading...</div>}>
          <BlogListing initialBlogs={initialBlogs} totalPages={totalPages} />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

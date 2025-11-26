// src/app/blog/[...slug]/page.tsx

import BlogDetails from "@/components/pages/BlogDetails";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Suspense } from "react";

interface RouteParams {
  slug: string[];
}

interface Props {
  params: Promise<RouteParams>; // ✅ params is async in Next 15
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params; // ✅ await params

  const BASE_URL = process.env.NEXT_PUBLIC_API_SERVER_ENDPOINT!;
  const BLOG_BASE = "https://www.greycampus.com/blog";
  const post_url = `${BLOG_BASE}/${slug.join("/")}`;

  const res = await fetch(
    `${BASE_URL}/api/blogs?populate=*&filters[post_url][$eq]=${encodeURIComponent(
      post_url
    )}&timestamp=${Date.now()}`,
    { cache: "no-store" }
  );

  const data = await res.json();
  const blog = data?.data?.[0];

  if (!blog) {
    return {
      title: "Blog Not Found - GreyCampus",
      description: "The requested blog post could not be found.",
      robots: "noindex, nofollow",
    };
  }

  return {
    title:
      blog.post_seo_title || blog.post_title || "Blog Details - GreyCampus",
    description:
      blog.meta_description ||
      "Professional certification blog post on GreyCampus.",
    keywords: blog.keywords || "Blog, GreyCampus, Certification",
    authors: [{ name: blog.author || "GreyCampus" }],
    creator: "GreyCampus",
    publisher: "GreyCampus",
    alternates: {
      canonical: post_url,
    },
    openGraph: {
      title: blog.post_seo_title || blog.post_title,
      description: blog.meta_description,
      url: post_url,
      siteName: "GreyCampus",
      locale: "en_US",
      type: "article",
      images: blog.featured_image_url
        ? [{ url: blog.featured_image_url, alt: blog.post_title }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: blog.post_seo_title || blog.post_title,
      description: blog.meta_description,
      images: blog.featured_image_url ? [blog.featured_image_url] : undefined,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export const revalidate = 10;

export default async function BlogPage({ params }: Props) {
  const { slug } = await params; // ✅ await params

  const BASE_URL = process.env.NEXT_PUBLIC_API_SERVER_ENDPOINT!;
  const BLOG_BASE = "https://www.greycampus.com/blog";
  const post_url = `${BLOG_BASE}/${slug.join("/")}`;

  const res = await fetch(
    `${BASE_URL}/api/blogs?populate=*&filters[post_url][$eq]=${encodeURIComponent(
      post_url
    )}&timestamp=${Date.now()}`,
    { cache: "no-store" }
  );

  const data = await res.json();

  if (!data || !data.data || data.data.length === 0) {
    redirect("/blog");
  }

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-800">
      <Navigation currentPage="blog" />
      <main className="mt-16">
        <div className="container max-w-7xl mx-auto">
          <Suspense
            fallback={
              <div className="flex justify-center py-20 text-[#0c868d]">
                Loading...
              </div>
            }
          >
            <BlogDetails blog={data.data[0]} />
          </Suspense>
        </div>
      </main>
      <Footer />
    </div>
  );
}

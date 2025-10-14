// src/app/opencampus/[...slug]/page.tsx

import OpenCampusBlogDetails from "@/components/pages/OpenCampusBlogDetails";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Suspense } from "react";

interface Props {
  params: {
    slug: string[];
  };
}

const BASE_URL_API = process.env.NEXT_PUBLIC_API_SERVER_ENDPOINT!;
const BLOG_BASE_URL = "https://www.greycampus.com/opencampus";

// ✅ Generate Static Params (App Router equivalent of getStaticPaths)
export async function generateStaticParams() {
    const API_URL = `${BASE_URL_API}/api/open-campus-blogs?fields[0]=post_url&timestamp=${Date.now()}`;
    const res = await fetch(API_URL, { next: { revalidate: 60 * 60 } }); // Cache paths for longer
    const blogs = await res.json();

    const paths = blogs.data
        .map((blog: any) => {
            let postUrl = blog.post_url;
            
            // Remove the base URL and ensure path is clean
            postUrl = postUrl.replace(/^https?:\/\/www\.greycampus\.com\/opencampus\//, '');
            postUrl = postUrl.replace(/^\/|\/$/g, '');

            const slugParts = postUrl.split('/');

            return { slug: slugParts };
        })
        .filter((path: any) => path.slug.length > 0);

    return paths;
}

// ✅ Generate Metadata (App Router equivalent of setting SEO in getStaticProps)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const awaitedParams = await params; // Fix for Turbopack/async params issue
  const post_url = `${BLOG_BASE_URL}/${awaitedParams.slug.join("/")}`;

  const res = await fetch(
    `${BASE_URL_API}/api/open-campus-blogs?populate=*&filters[post_url][$eq]=${encodeURIComponent(post_url)}&timestamp=${Date.now()}`,
    { next: { revalidate: 10 } } // Revalidate metadata on every 10s
  );
  const data = await res.json();
  const blog = data?.data?.[0];

  if (!blog) {
    return { title: "Blog Not Found - OpenCampus", robots: "noindex, nofollow" };
  }

  // Determine current absolute URL for canonical/OG tags (Simulating router.asPath)
  const currentPath = `/opencampus/${awaitedParams.slug.join("/")}`;

  return {
    title: blog.post_seo_title || blog.post_title || "OpenCampus Blog Details",
    description: blog.meta_description || "OpenCampus professional certification content.",
    keywords: blog.keywords || "OpenCampus, Certification, Blog",
    authors: [{ name: blog.author || "GreyCampus" }],
    openGraph: {
      title: blog.post_seo_title || blog.post_title,
      description: blog.meta_description,
      url: currentPath,
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
    robots: { index: true, follow: true },
    alternates: { canonical: currentPath }
  };
}

export const revalidate = 10; // Global revalidate setting

// ✅ Default Page Component (App Router equivalent of fetching data in getStaticProps)
export default async function OpenCampusBlogDetailsPage({ params }: Props) {
  const awaitedParams = await params; // Fix for Turbopack/async params issue
  const post_url = `${BLOG_BASE_URL}/${awaitedParams.slug.join("/")}`;

  const res = await fetch(
    `${BASE_URL_API}/api/open-campus-blogs?populate=*&filters[post_url][$eq]=${encodeURIComponent(post_url)}&timestamp=${Date.now()}`,
    { next: { revalidate: 10 } }
  );
  const data = await res.json();

  if (!data || !data.data || data.data.length === 0) {
    // ✅ Redirect if blog not found (as per getStaticProps logic)
    redirect("/opencampus"); 
  }

  return(
    <div className="flex flex-col min-h-screen bg-white text-gray-800">
          <Navigation currentPage="opencampus" />
          <main className="mt-16">
            <div className="container mx-auto">
            <Suspense fallback={<div className="flex justify-center py-20 text-[#0c868d]">Loading...</div>}>
              <OpenCampusBlogDetails blog={data.data[0]} />
            </Suspense>
            </div>
          </main>
          <Footer />
        </div>
  ) 
}
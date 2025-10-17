// src/components/pages/OpenCampusBlogDetails.tsx
'use client';

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import dynamic from "next/dynamic";

// Dynamic import for related blogs list
const OpenCampusBlogList = dynamic(() => import("@/components/OpenCampusBlogList"), {
    ssr: false, 
    // Using a specific color for the loader
    loading: () => <div className="flex justify-center p-4 bg-white border border-gray-300 rounded-lg"><Loader2 className="animate-spin w-6 h-6 text-[#34AEB5]" /></div>, 
});

interface BlogBlock {
    id: number;
    __component: "rich-text.text-block" | "image.image-block";
    textContent?: string;
    imge?: any[]; 
}

interface OpenCampusBlogDetailsProps {
    blog: {
        post_title: string;
        post_body: string;
        content: BlogBlock[];
        featured_image_url?: string;
        opencampus_category?: { name: string };
        [key: string]: any;
    };
}

// ✅ Function to Convert Markdown to HTML (Tailwind specific classes added for links/headers)
const parseMarkdown = (markdown: string) => {
    if (!markdown) return "";

    let html = markdown
        .replace(/^### (.*$)/gm, '<h3 class="text-2xl font-semibold mt-6 mb-3 text-gray-800">$1</h3>') // H3
        .replace(/^## (.*$)/gm, '<h2 class="text-3xl font-bold mt-8 mb-4 border-b border-gray-200 pb-2 text-gray-800">$1</h2>') // H2
        .replace(/^# (.*$)/gm, '<h1 class="text-4xl font-extrabold mt-10 mb-5 text-gray-800">$1</h1>') // H1
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // Bold
        .replace(/\*(.*?)\*/g, "<em>$1</em>") // Italic
        .replace(/~~(.*?)~~/g, "<del>$1</del>") // Strikethrough
        // Links with brand color
        .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" class="text-[#34AEB5] hover:text-[#2a8c91] underline transition-colors">$1</a>'); 
        
    // Handle paragraphs and lists
    html = html.replace(/\n{2,}/g, '</p><p>');
    html = html.replace(/\n/g, '<br/>'); 

    const blockRegex = /^(<h[1-6]|<ul|<ol|<div|<p|<li)/i;
    if (!blockRegex.test(html.trim())) {
      html = `<p>${html}</p>`;
    }
    
    // Clean up <p> tags around block elements
    html = html.replace(/<p>(\s*<h[1-6].*?h[1-6]>)/gi, "$1");
    html = html.replace(/(<h[1-6].*?h[1-6]>\s*)<\/p>/gi, "$1");

    return html;
};

// Function to Render Blog Content (Same as before)
const renderContent = (block: BlogBlock) => {
    if (block.__component === "rich-text.text-block") {
        return (
            <div
                key={block.id}
                className="mb-4 text-gray-800 blog-content" 
                dangerouslySetInnerHTML={{
                    __html: parseMarkdown(block.textContent || ""),
                }}
            />
        );
    }
    
    if (block.__component === "image.image-block" && block.imge) {
        return block.imge.map((image: any) => {
            const src =
                image.formats?.large?.url || 
                image.formats?.medium?.url ||
                image.formats?.small?.url ||
                image.url;
            const API_URL = process.env.NEXT_PUBLIC_API_SERVER_ENDPOINT;

            return (
                <div key={image.id} className="w-full rounded-lg overflow-hidden mb-4">
                    <Image
                        src={API_URL + src}
                        alt={image.alternativeText || "Blog Image"}
                        width={1000} 
                        height={500}
                        className="w-full h-auto object-cover"
                        priority
                    />
                </div>
            );
        });
    }
    return null;
};

// ✅ Left Sidebar Component (FIXED - Removed legacyBehavior and <a>)
const LeftSidebar = () => {
    const resourceLinks = [
        { label: "Training Courses", path: "/" },
        { label: "Open Campus", path: "/opencampus" },
        { label: "Blog", path: "/blog" },
    ];
    
    const linkClasses = "w-full p-2 mb-3 border rounded-md text-center transition-colors";
    const primaryColor = "#0c868d"; // Using the actual brand color for hover/border

    return (
        <div className="flex flex-col p-4 bg-gray-100 text-gray-800 rounded-lg shadow-lg border border-gray-200">
            <h6 className="text-xl font-bold mb-4">Premium Resources</h6>
            
            {/* FIX: Removed legacyBehavior/a, used explicit colors */}
            <Link 
                href="/" 
                className={`${linkClasses} border-primary-green text-primary-green hover:bg-primary-green hover:text-white font-medium`}
            >
                Training Courses
            </Link>

            <h6 className="text-xl font-bold mt-4 mb-4">Free Resources</h6>
            {resourceLinks.slice(1).map((item) => (
                <Link 
                    key={item.label} 
                    href={item.path} 
                    className={`${linkClasses} border-gray-400 text-gray-800 hover:bg-gray-200 hover:border-gray-500`}
                >
                    {item.label}
                </Link>
            ))}
        </div>
    );
};

const OpenCampusBlogDetails: React.FC<OpenCampusBlogDetailsProps> = ({ blog }) => {
    
    if (!blog) {
        // Using the primary brand color for the loader
        return <div className="flex justify-center py-20"><Loader2 className="animate-spin w-10 h-10 text-[#34AEB5]" /></div>;
    }

    const categoryName = blog?.opencampus_category?.name || "All";

    return (
        // Added font-inter
        <div className="bg-white text-gray-800 min-h-screen font-inter"> 
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4 py-8">
                
                {/* 1. Left Sidebar */}
                <div className="md:col-span-1">
                    <LeftSidebar />
                </div>
                
                {/* 2. Main Content */}
                <div className="md:col-span-2 lg:col-span-2 text-gray-800">
                    <h1 className="text-4xl font-semibold mb-6 leading-tight">{blog?.post_title || "Blog Title"}</h1>
                    
                    {/* Featured Image (Optional) */}
                    {blog.featured_image_url && (
                        <div className="w-full mb-8 rounded-lg overflow-hidden">
                            <Image
                                src={blog.featured_image_url}
                                alt={blog.post_title}
                                width={1000}
                                height={500}
                                className="w-full h-auto object-cover"
                                priority
                            />
                        </div>
                    )}

                    {/* Content Block (post_body + content array) */}
                    <div
                        className="font-inter text-base leading-relaxed space-y-4 blog-content"
                        dangerouslySetInnerHTML={{
                            __html: parseMarkdown(blog?.post_body || ""),
                        }}
                    />
                    {blog?.content?.map(renderContent)}
                </div>

                {/* 3. Right Sidebar - Related Blogs */}
                <div className="md:col-span-3 lg:col-span-1">
                    <OpenCampusBlogList category={categoryName} />
                </div>
            </div>
            {/* ✅ Custom CSS to style markdown content (Merged and cleaned up styles) */}
            <style jsx global>{`
                .blog-content strong {
                    font-weight: 700 !important;
                }
                .blog-content em {
                    font-style: italic !important;
                }
                
                .blog-content h1 {
                    font-size: 2.5rem; /* ~40px */
                    font-weight: 600;
                    margin-top: 1rem;
                    margin-bottom: 0rem;
                    color: #1f2937; /* gray-900 */
                }

                .blog-content h2 {
                    font-size: 2rem; /* ~32px */
                    font-weight: 400;
                    margin-top: 2rem;
                    margin-bottom: 1rem;
                    border-bottom: 1px solid #e5e7eb; /* gray-200 */
                    padding-bottom: 0.5rem;
                    color: #1f2937;
                }

                .blog-content h3 {
                    font-size: 1.5rem; /* ~24px */
                    font-weight: 400;
                    margin-top: 1.5rem;
                    margin-bottom: 0.75rem;
                    color: #1f2937;
                }

                .blog-content p {
                    margin-bottom: 1rem;
                    line-height: 1.75;
                }

                .blog-content a {
                    color: #1d4ed8; /* blue-700 */
                    text-decoration: underline;
                }

                .blog-content a:hover {
                    color: #1e40af; /* blue-900 */
                }

                /* Style for UL and LI */
                .blog-content ul {
                    list-style-type: disc; /* Use a solid bullet point */
                    margin-left: 1.5rem;
                    padding-left: 0.5rem;
                    margin-bottom: 1rem;
                    color: #374151; /* Darker text for list items */
                }

                .blog-content li {
                    margin-bottom: 0.5rem;
                    line-height: 1.75;
                }

                /* Aggressive cleanup for stray breaks */
                .blog-content h1 + br,
                .blog-content h2 + br,
                .blog-content h3 + br,
                .blog-content ul li + br,
                .blog-content ul + br,
                .blog-content br {
                    display: none;
                }   
            `}</style>
        </div>
    );
};

export default OpenCampusBlogDetails;
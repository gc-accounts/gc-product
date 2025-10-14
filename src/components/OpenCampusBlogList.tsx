// src/components/OpenCampusBlogList/index.tsx
'use client';

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";

type Blog = {
    id: number;
    post_title: string;
    post_url: string;
};

const API_URL = process.env.NEXT_PUBLIC_API_SERVER_ENDPOINT + "/api/open-campus-blogs?populate=*";
const PAGE_SIZE = 20;

interface OpenCampusBlogListProps {
    category: string;
}

const OpenCampusBlogList: React.FC<OpenCampusBlogListProps> = ({ category }) => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const fetchBlogs = async () => {
        if (!hasMore || loading) return;

        setLoading(true);
        try {
            const response = await fetch(
                `${API_URL}&pagination[page]=${page}&pagination[pageSize]=${PAGE_SIZE}&timestamp=${Date.now()}&filters[opencampus_category][name][$eq]=${encodeURIComponent(category)}`
            );
            const data = await response.json();
            const newBlogs: Blog[] = data.data || [];

            // ✅ Deduplication logic to prevent 'duplicate key' error
            setBlogs((prevBlogs) => {
                const existingIds = new Set(prevBlogs.map(b => b.id));
                const uniqueNewBlogs = newBlogs.filter(b => !existingIds.has(b.id));
                
                return [...prevBlogs, ...uniqueNewBlogs];
            });

            setHasMore(newBlogs.length === PAGE_SIZE);
            setPage((prevPage) => prevPage + 1);
        } catch (error) {
            console.error("Error fetching related OpenCampus blogs:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
        if (scrollTop + clientHeight >= scrollHeight - 10) {
            fetchBlogs();
        }
    };

    useEffect(() => {
        // Reset state and start fetching when category changes
        setBlogs([]);
        setPage(1);
        setHasMore(true);
        fetchBlogs();
    }, [category]); 

    const getRelativePath = (post_url: string) => {
        return post_url.replace('https://www.greycampus.com/opencampus/', '');
    }

    return (
        <div
            className='h-[500px] overflow-y-scroll mx-auto border border-gray-300 rounded-lg p-4 bg-white text-gray-800 shadow-md font-inter custom-scrollbar'
            onScroll={handleScroll}
        >
            <h5 className="text-xl font-bold mb-4 text-center text-gray-800">
                Related Blogs
            </h5>
            <div className="flex flex-col space-y-3">
                {blogs.map((blog) => (
                    // ✅ FIX: Removed legacyBehavior/a
                    <Link
                        key={blog.id} 
                        href={`/opencampus/${getRelativePath(blog.post_url)}`}
                        className="block text-sm hover:text-primary-green underline transition-colors"
                    >
                        {blog.post_title || "Untitled Blog"}
                    </Link>
                ))}
            </div>
            
            {loading && (
                <div className="flex justify-center mt-4">
                    <Loader2 className="animate-spin w-6 h-6 text-primary-green" />
                </div>
            )}
            {!hasMore && blogs.length > 0 && (
                <p className="text-xs text-center mt-4 text-gray-500">
                    No more blogs to display.
                </p>
            )}
        </div>
    );
};

export default OpenCampusBlogList;
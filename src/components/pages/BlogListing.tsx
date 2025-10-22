'use client';

import React, { useState, useEffect } from "react";
import BlogSection from "../BlogSection";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { Loader2 } from "lucide-react";

interface Props {
  initialBlogs: any[];
  totalPages: number;
}

const BlogListing = ({ initialBlogs, totalPages }: Props) => {
  const [blogs, setBlogs] = useState(initialBlogs);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const pageSize = 9;

  const fetchMoreBlogs = async (page: number) => {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_SERVER_ENDPOINT}/api/blogs?pagination[page]=${page}&pagination[pageSize]=${pageSize}&timestamp=${Date.now()}`
      );
      const data = await res.json();
      setBlogs(data.data || []);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMoreBlogs(currentPage);
    // eslint-disable-next-line
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <>
    <section className="bg-gradient-hero px-[20px] py-[50px] md:px-[30px] md:py-[70px]">
        <div className="container max-w-7xl mx-auto">

             <h1 className="text-4xl sm:text-5xl md:text-4xl lg:text-5xl font-bold text-dark-gray leading-tight mb-3">
                The GreyCampus {' '}
                <span className="text-gradient">Blog</span>
              </h1>

              <p className="text-base md:text-lg text-medium-gray leading-relaxed max-w-4xl">
                A dedicated blog for professional certifications across the world. GreyCampus provides abundant resources on professional certification like PMP, Six Sigma, ITIL and more.
              </p>

        </div>
    </section>
    <section className="px-[20px] py-[50px] md:px-[30px] md:py-[70px]">
        <div className="container max-w-7xl mx-auto">
      {loading ? (
        <div className="flex justify-center">
          <Loader2 className="animate-spin w-10 h-10 text-[#0c868d]" />
        </div>
      ) : (
        <BlogSection posts={blogs} />
      )}

              </div>
    </section>

      {/* Pagination */}
      <div className="py-8 bg-gray-200 rounded-t-2xl max-w-4xl mx-auto">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(currentPage - 1);
                }}
                className={currentPage === 1 ? "opacity-50 pointer-events-none" : ""}
              />
            </PaginationItem>

            {[...Array(totalPages)].map((_, i) => {
              const page = i + 1;
              if (page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1) {
                return (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href="#"
                      isActive={currentPage === page}
                      onClick={(e) => {
                        e.preventDefault();
                        handlePageChange(page);
                      }}
                      className="text-[#0c868d]"
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                );
              } else if (Math.abs(page - currentPage) === 2) {
                return (
                  <PaginationItem key={`ellipsis-${page}`}>
                    <PaginationEllipsis />
                  </PaginationItem>
                );
              }
              return null;
            })}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(currentPage + 1);
                }}
                className={currentPage === totalPages ? "opacity-50 pointer-events-none" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
};

export default BlogListing;

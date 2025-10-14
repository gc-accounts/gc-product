// src/components/pages/OpenCampusListing.tsx
'use client';

import React, { useState, useEffect } from "react";
import OpenCampusSection from "../OpenCampusSection";
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

const OpenCampusListing = ({ initialBlogs, totalPages }: Props) => {
  const [blogs, setBlogs] = useState(initialBlogs);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const pageSize = 9;

  const fetchMoreBlogs = async (page: number) => {
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_SERVER_ENDPOINT}/api/open-campus-blogs?pagination[page]=${page}&pagination[pageSize]=${pageSize}&populate=*&timestamp=${Date.now()}`
      );
      const data = await res.json();
      setBlogs(data.data || []);
    } catch (error) {
      console.error("Error fetching OpenCampus blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Only fetch if current blogs array doesn't contain the initial data (i.e., we changed page)
    if (currentPage !== 1 || blogs.length === 0) {
        fetchMoreBlogs(currentPage);
    }
    // eslint-disable-next-line
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <>
   
        {/* The OpenCampusSection component includes its own header/banner */}
        {loading ? (
            <div className="flex justify-center py-20">
                <Loader2 className="animate-spin w-10 h-10 text-[#0c868d]" />
            </div>
        ) : (
            <OpenCampusSection posts={blogs} />
        )}


      {/* Pagination (Replicated styling from BlogListing) */}
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

export default OpenCampusListing;
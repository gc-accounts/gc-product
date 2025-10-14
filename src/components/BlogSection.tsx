import React from "react";
import BlogCard  from "./BlogCard";


interface Props {
  posts: any[];
}

const BlogSection = ({ posts }: Props) => {
  const getRelativePath = (url: string) => url.replace("https://www.greycampus.com/blog/", "/blog/");

  return (
    <div className="flex flex-col items-center md:px-8 gap-8">
      {/* NEW: Use Grid Layout for 3 columns on large screens 
        gap-6 provides spacing between the cards
      */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl w-full">
        {posts.map((post) => (
          // The card wrapper no longer needs a fixed width, it fills the grid column
          <div key={post.id} className="w-full"> 
            <BlogCard {...post} onReadMorePath={getRelativePath(post.post_url)} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogSection;
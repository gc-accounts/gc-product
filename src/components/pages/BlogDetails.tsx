"use client";

import { Loader2 } from "lucide-react";

interface BlogDetailsProps {
  blog: any;
}

// SIMPLIFIED MARKDOWN PARSER
const parseMarkdown = (markdown: string) => {
  if (!markdown) return "";

  let html = markdown
    .replace(/<span[^>]*>(.*?)<\/span>/gi, "$1")
    .replace(/<p[^>]*>(.*?)<\/p>/gi, "$1")
    .replace(/&nbsp;/g, " ")
    .replace(/\r/g, "");

  html = html
    .replace(/^### (.*$)/gm, "<h3>$1</h3>")
    .replace(/^## (.*$)/gm, "<h2>$1</h2>")
    .replace(/^# (.*$)/gm, "<h1>$1</h1>");

  html = html
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(
      /\[(.*?)\]\((.*?)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
    );

  html = html.replace(/^- (.*)$/gm, "<li>$1</li>");
  html = html.replace(/<p>(<li>.*?<\/li>)<\/p>/gi, "$1");
  html = html.replace(/(<li>.*?<\/li>)\s*(<li>.*?<\/li>)/gs, "$1\n$2");
  html = html.replace(
    /(^|\n)(<li>.*?<\/li>(?:\n<li>.*?<\/li>)*)/gs,
    "\n<ul>\n$2\n</ul>\n"
  );

  html = html.replace(/\n{2,}/g, "</p><p>");

  const blockRegex = /^(<h[1-6]|<ul|<ol|<div|<p|<li)/i;
  if (!blockRegex.test(html.trim())) {
    html = `<p>${html}</p>`;
  }

  html = html.replace(/<p>(\s*<(h[1-6]|ul).*?\/\2>)/gi, "$1");
  html = html.replace(/(<(h[1-6]|ul).*?\/\2>\s*)<\/p>/gi, "$1");
  html = html.replace(/\n/g, "<br/>");

  return html;
};

const BlogDetails: React.FC<BlogDetailsProps> = ({ blog }) => {
  if (!blog) {
    return (
      <div className="flex justify-center items-center min-h-[40vh]">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  const {
    post_title = "Untitled Post",
    post_body = "",
    publish_date = null,
    author = "Unknown",
    category = "Uncategorized",
    featured_image_url = "",
  } = blog;

  // ✅ Stable date formatting (no locale-based mismatch)
  const formattedDate = publish_date
    ? new Intl.DateTimeFormat("en-GB", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "UTC",
      }).format(new Date(publish_date))
    : "Unknown";

  const customStyles = `
    .blog-content h1 {
      font-size: 2.5rem;
      font-weight: 600;
      margin-top: 1rem;
      margin-bottom: 0rem;
      color: #1f2937;
    }

    .blog-content h2 {
      font-size: 2rem;
      font-weight: 400;
      margin-top: 2rem;
      margin-bottom: 1rem;
      border-bottom: 1px solid #e5e7eb;
      padding-bottom: 0.5rem;
      color: #1f2937;
    }

    .blog-content h3 {
      font-size: 1.5rem;
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
      color: #1d4ed8;
      text-decoration: underline;
    }

    .blog-content a:hover {
      color: #1e40af;
    }

    .blog-content ul {
      list-style-type: disc;
      margin-left: 1.5rem;
      padding-left: 0.5rem;
      margin-bottom: 1rem;
    }

    .blog-content li {
      margin-bottom: 0.5rem;
      line-height: 1.75;
    }

    .blog-content h1 + br,
    .blog-content h2 + br,
    .blog-content h3 + br,
    .blog-content ul li + br,
    .blog-content ul + br,
    .blog-content br {
      display: none;
    }
  `;

  return (
    <div className="bg-white text-gray-900 py-12 px-4 md:px-12 min-h-[80vh]">
      {/* 🔧 Ignore hydration differences for this style block */}
      <style
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: customStyles }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {/* Main Content */}
        <main className="lg:col-span-2">
          {featured_image_url && (
            <img
              src={featured_image_url}
              alt={post_title}
              className="rounded-lg mb-8 w-full max-h-[400px] object-cover"
            />
          )}
          <div
            className="text-gray-900 leading-relaxed space-y-4 blog-content"
            dangerouslySetInnerHTML={{ __html: parseMarkdown(post_body) }}
          />
        </main>

        {/* Sidebar */}
        <aside className="lg:col-span-1 space-y-6 sticky top-20 self-start min-w-[240px] border border-gray-200 bg-gray-50 rounded-lg p-4">
          <div className="border-b border-gray-200 pb-3 flex justify-between items-center">
            <span className="font-semibold text-gray-700">Date</span>
            <span className="text-gray-600">{formattedDate}</span>
          </div>
          <div className="border-b border-gray-200 pb-3 flex justify-between items-center">
            <span className="font-semibold text-gray-700">About Author</span>
            <span className="text-gray-600">{author}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-semibold text-gray-700">Category</span>
            <span className="text-gray-600">{category}</span>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default BlogDetails;

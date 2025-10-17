'use client';

import { useEffect } from "react";
import { Loader2 } from "lucide-react";

interface BlogDetailsProps {
  blog: any;
}

// SIMPLIFIED MARKDOWN PARSER
// Focus on structure: headings, lists, links, and line breaks.
const parseMarkdown = (markdown: string) => {
  if (!markdown) return "";

  // 1. CLEANUP (Aggressive removal of potential inline style contaminants)
  let html = markdown
    .replace(/<span[^>]*>(.*?)<\/span>/gi, "$1") // Remove <span> tags, keep content
    .replace(/<p[^>]*>(.*?)<\/p>/gi, "$1")       // Remove existing <p> tags, keep content
    .replace(/&nbsp;/g, ' ')                      // Replace non-breaking spaces
    .replace(/\r/g, '');                         // Remove carriage returns

  // 2. Headings: Use a simple, clean tag structure without inline classes
  html = html
    .replace(/^### (.*$)/gm, '<h3>$1</h3>')
    .replace(/^## (.*$)/gm, '<h2>$1</h2>')
    .replace(/^# (.*$)/gm, '<h1>$1</h1>');
  
  // 3. Inline Styling and Links 
  html = html
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") 
    .replace(/\*(.*?)\*/g, "<em>$1</em>")             
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'); // Link styling moved to inline <style>
  
  // 4. Lists
  // Use a more robust regex for list items that might be wrapped in paragraph tags from earlier processing
  html = html.replace(/^- (.*)$/gm, '<li>$1</li>');
  html = html.replace(/<p>(<li>.*?<\/li>)<\/p>/gi, "$1"); // Cleanup p tags around list items
  // Wrap adjacent <li> tags in <ul>
  html = html.replace(/(<li>.*?<\/li>)\s*(<li>.*?<\/li>)/gs, '$1\n$2');
  html = html.replace(/(^|\n)(<li>.*?<\/li>(?:\n<li>.*?<\/li>)*)/gs, '\n<ul>\n$2\n</ul>\n');

  // 5. Paragraphs and Line Breaks
  // Replace 2+ newlines with a paragraph separator
  html = html.replace(/\n{2,}/g, '</p><p>');

  // Wrap the entire content in a paragraph if it doesn't already start with a block-level element
  const blockRegex = /^(<h[1-6]|<ul|<ol|<div|<p|<li)/i;
  if (!blockRegex.test(html.trim())) {
    html = `<p>${html}</p>`;
  }

  // Remove <p> tags around headings and list elements
  html = html.replace(/<p>(\s*<(h[1-6]|ul).*?\/\2>)/gi, "$1");
  html = html.replace(/(<(h[1-6]|ul).*?\/\2>\s*)<\/p>/gi, "$1");
  html = html.replace(/\n/g, '<br/>'); // Final replacement of single newlines with a break

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

  // The custom styles as requested, embedded directly using a <style> tag
  const customStyles = `
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
  `;

  return (
    <div className="bg-white text-gray-900 py-12 px-4 md:px-12 min-h-[80vh]">
        {/* Inject the custom styles here for high specificity */}
        <style dangerouslySetInnerHTML={{ __html: customStyles }} />
        
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {/* Main Content */}
        <main className="lg:col-span-2">
          {/* <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">{post_title}</h1> */}
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
        {/* Sidebar (remains the same) */}
        <aside className="lg:col-span-1 space-y-6 sticky top-20 self-start min-w-[240px] border border-gray-200 bg-gray-50 rounded-lg p-4">
          <div className="border-b border-gray-200 pb-3 flex justify-between items-center">
            <span className="font-semibold text-gray-700">Date</span>
            <span className="text-gray-600">{publish_date ? new Date(publish_date).toLocaleString() : "Unknown"}</span>
          </div>
          <div className="border-b border-gray-200 pb-3 flex justify-between items-center">
            <span className="font-semibold text-gray-700">About Author</span>
            <span className="text-gray-600">{author}</span>
          </div>
          <div className=" flex justify-between items-center">
            <span className="font-semibold text-gray-700">Category</span>
            <span className="text-gray-600">{category}</span>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default BlogDetails;
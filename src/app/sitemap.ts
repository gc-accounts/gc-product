import { MetadataRoute } from "next";

const BASE_URL = "https://www.greycampus.com";
const API = process.env.NEXT_PUBLIC_API_SERVER_ENDPOINT;
const PAGE_SIZE = 100;

// Utility to fetch ALL paginated blog posts
async function fetchAllBlogSlugs(apiUrl: string, replaceBase: string, routePrefix: string): Promise<MetadataRoute.Sitemap> {
  let allPosts: MetadataRoute.Sitemap = [];
  let page = 1;
  let totalPages = 1;

  do {
    const res = await fetch(`${apiUrl}&pagination[page]=${page}&pagination[pageSize]=${PAGE_SIZE}`);
    const data = await res.json();

    if (!data.data || data.data.length === 0) break;

    const mapped = data.data
      .map((item: any) => {
        // Supports both attributes and post_url
        const urlRaw = item?.attributes?.post_url ?? item?.post_url;
        if (!urlRaw) return null;
        // Clean slug/path
        const slug = urlRaw.replace(replaceBase, "").replace(/^\/|\/$/g, "");
        const fullUrl = `${BASE_URL}/${routePrefix}/${slug}`;
        const updatedAt = item?.attributes?.updatedAt ?? new Date().toISOString();
        return {
          url: fullUrl,
          lastModified: updatedAt,
          changeFrequency: "weekly",
          priority: 0.7,
        };
      })
      .filter(Boolean);

    allPosts = [...allPosts, ...mapped];
    totalPages = data?.meta?.pagination?.pageCount || 1;
    page++;
  } while (page <= totalPages);

  return allPosts;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // List ALL static routes here
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/about-us`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/layout`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/notFound`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/opencampus`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/privacyPolicy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.5 },
    { url: `${BASE_URL}/termsOfUse`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.5 },
    { url: `${BASE_URL}/thank-you`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.5 },
    { url: `${BASE_URL}/corporate`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.5 },
    { url: `${BASE_URL}/data-science-bootcamp`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.5 },
    { url: `${BASE_URL}/data-analyst-bootcamp`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.5 },
    { url: `${BASE_URL}/aiml-bootcamp`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.5 },
    // Add more as needed...
  ];

  // Fetch ALL blogs (paginated)
  const blogsApi = `${API}/api/blogs?fields=post_url`;
  const openCampusApi = `${API}/api/open-campus-blogs?fields=post_url`;

  const [blogRoutes, openCampusRoutes] = await Promise.all([
    fetchAllBlogSlugs(blogsApi, "https://www.greycampus.com/blog/", "blog"),
    fetchAllBlogSlugs(openCampusApi, "https://www.greycampus.com/opencampus/", "opencampus"),
  ]);

  // Remove duplicate URLs (merging everything)
  const allEntries = [...staticRoutes, ...blogRoutes, ...openCampusRoutes];
  const seen = new Set();
  const uniqueEntries = allEntries.filter(item => {
    if (seen.has(item.url)) return false;
    seen.add(item.url);
    return true;
  });

  return uniqueEntries;
}

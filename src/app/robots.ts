import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/"],
      disallow: ["/admin", "/api", "/*.json$"],
    },
    host: "https://www.greycampus.com/",
    sitemap: "https://www.greycampus.com/sitemap.xml",
  };
}

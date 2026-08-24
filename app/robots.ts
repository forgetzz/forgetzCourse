import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/dashboard/",
        "/studio/",
        "/api/",
        "/login/",
        "/signup/",
      ],
    },

    sitemap: "https://class.forgetzstudio.com/sitemap.xml",
  };
}
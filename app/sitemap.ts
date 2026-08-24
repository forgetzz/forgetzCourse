import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://class.forgetzstudio.com",
      lastModified: new Date(),
    },
  ];
}
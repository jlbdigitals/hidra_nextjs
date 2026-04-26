import type { MetadataRoute } from "next";

const BASE_URL = "https://hidra.cl";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/checkout/", "/carrito/", "/api/"],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}

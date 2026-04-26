import type { MetadataRoute } from "next";

const BASE_URL = "https://hidra.cl";

const catalogCategories = [
  "bombas",
  "filtros",
  "valvulas",
  "riego-agricola",
  "riego-areas-verdes",
  "tuberias",
  "control",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/bombas`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/catalogo`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/cotizar`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/contacto`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/nosotros`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/zanjado`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];

  const catalogRoutes: MetadataRoute.Sitemap = catalogCategories.map((cat) => ({
    url: `${BASE_URL}/catalogo/${cat}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...catalogRoutes];
}

import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://stud-iu.bmstu.ru/',
      lastModified: '2025-09-01',
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}

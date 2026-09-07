import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/cart', '/account'],
    },
    sitemap: 'https://insidersellers.example/sitemap.xml',
  };
}

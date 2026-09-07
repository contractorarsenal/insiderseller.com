import { MetadataRoute } from 'next';
import { products } from '@/lib/data/products';
import { designers } from '@/lib/data/designers';

const BASE_URL = 'https://insidersellers.example';

const STATIC_ROUTES = [
  '',
  '/shop',
  '/new-arrivals',
  '/designers',
  '/archive',
  '/sell',
  '/source',
  '/authenticity',
  '/about',
  '/faq',
  '/contact',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = STATIC_ROUTES.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
  }));

  const designerEntries = designers.map((d) => ({
    url: `${BASE_URL}/designers/${d.slug}`,
    lastModified: new Date(),
  }));

  const productEntries = products.map((p) => ({
    url: `${BASE_URL}/products/${p.slug}`,
    lastModified: p.dateAdded,
  }));

  return [...staticEntries, ...designerEntries, ...productEntries];
}

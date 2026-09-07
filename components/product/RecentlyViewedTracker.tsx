'use client';

import { useEffect } from 'react';
import { useRecentlyViewedStore } from '@/lib/store/recentlyViewed';

export default function RecentlyViewedTracker({ productId }: { productId: string }) {
  const add = useRecentlyViewedStore((s) => s.add);
  useEffect(() => {
    add(productId);
  }, [productId, add]);
  return null;
}

'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface RecentlyViewedState {
  productIds: string[];
  add: (productId: string) => void;
}

const MAX = 8;

export const useRecentlyViewedStore = create<RecentlyViewedState>()(
  persist(
    (set, get) => ({
      productIds: [],
      add: (productId) => {
        const existing = get().productIds.filter((id) => id !== productId);
        set({ productIds: [productId, ...existing].slice(0, MAX) });
      },
    }),
    { name: 'insider-recently-viewed' }
  )
);

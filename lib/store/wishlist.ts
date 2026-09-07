'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WishlistState {
  productIds: string[];
  toggle: (productId: string) => void;
  has: (productId: string) => boolean;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      productIds: [],
      toggle: (productId) => {
        const exists = get().productIds.includes(productId);
        set((state) => ({
          productIds: exists
            ? state.productIds.filter((id) => id !== productId)
            : [...state.productIds, productId],
        }));
      },
      has: (productId) => get().productIds.includes(productId),
    }),
    { name: 'insider-wishlist' }
  )
);

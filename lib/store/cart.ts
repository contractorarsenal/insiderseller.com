'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartState {
  productIds: string[];
  add: (productId: string) => void;
  remove: (productId: string) => void;
  clear: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      productIds: [],
      add: (productId) => {
        if (get().productIds.includes(productId)) return;
        set((state) => ({ productIds: [...state.productIds, productId] }));
      },
      remove: (productId) =>
        set((state) => ({ productIds: state.productIds.filter((id) => id !== productId) })),
      clear: () => set({ productIds: [] }),
    }),
    { name: 'insider-cart' }
  )
);

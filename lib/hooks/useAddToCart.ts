'use client';

import { useState } from 'react';
import { useCartStore } from '@/lib/store/cart';
import { useUIStore } from '@/lib/store/ui';

/**
 * Shared add-to-cart behavior with a brief "Added to Bag" confirmation
 * state before the cart drawer opens, instead of an abrupt jump straight
 * into the drawer. Pass `onSettle` when the caller is itself an overlay
 * (e.g. QuickView) that should close at the same moment the cart drawer
 * opens, rather than leaving two overlays stacked.
 */
export function useAddToCart(productId: string, onSettle?: () => void) {
  const inCart = useCartStore((s) => s.productIds.includes(productId));
  const addToCart = useCartStore((s) => s.add);
  const setCartOpen = useUIStore((s) => s.setCartOpen);
  const [justAdded, setJustAdded] = useState(false);

  function add() {
    addToCart(productId);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
      setCartOpen(true);
      onSettle?.();
    }, 700);
  }

  return { inCart, justAdded, add, openCart: () => setCartOpen(true) };
}

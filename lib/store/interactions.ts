'use client';

import { create } from 'zustand';

/**
 * Session-only (non-persisted) count of "meaningful" product interactions —
 * quick view opens, PDP views. Used as one of the Insider Access popup's
 * OR-trigger conditions (see components/modals/NewsletterModal.tsx).
 */
interface InteractionState {
  count: number;
  increment: () => void;
}

export const useInteractionStore = create<InteractionState>()((set) => ({
  count: 0,
  increment: () => set((s) => ({ count: s.count + 1 })),
}));

'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AlertSubscription } from '@/lib/types';

interface AlertsState {
  alerts: AlertSubscription[];
  add: (alert: Omit<AlertSubscription, 'id' | 'createdAt'>) => void;
  remove: (id: string) => void;
}

export const useAlertsStore = create<AlertsState>()(
  persist(
    (set) => ({
      alerts: [],
      add: (alert) =>
        set((state) => ({
          alerts: [
            ...state.alerts,
            { ...alert, id: `alert-${Date.now()}`, createdAt: new Date().toISOString() },
          ],
        })),
      remove: (id) => set((state) => ({ alerts: state.alerts.filter((a) => a.id !== id) })),
    }),
    { name: 'insider-alerts' }
  )
);

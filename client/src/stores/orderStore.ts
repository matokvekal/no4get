import { create } from 'zustand';
import { api } from '@/utils/api.ts';
import { storageGet, storageSet } from '@/core/storage/index.ts';
import type { BasketItem, Order } from '@/core/types/index.ts';

const BASKET_KEY = 'giftvibes_basket';
const TIMELINE_KEY = 'giftvibes_timeline';

interface OrderStore {
  basket: BasketItem[];
  orders: Order[];
  loading: boolean;
  timelineOrders: Order[];
  timelinePage: number;
  timelineHasMore: boolean;
  timelineLoading: boolean;
  addToBasket: (item: BasketItem) => void;
  removeFromBasket: (giftId: string) => void;
  clearBasket: () => void;
  loadOrders: () => Promise<void>;
  loadTimelinePage: () => Promise<void>;
  resetTimeline: () => void;
  checkout: () => Promise<Order[]>;
  basketTotal: () => number;
}

export const useOrderStore = create<OrderStore>((set, get) => ({
  basket: storageGet<BasketItem[]>(BASKET_KEY) ?? [],
  orders: [],
  loading: false,
  timelineOrders: storageGet<Order[]>(TIMELINE_KEY) ?? [],
  timelinePage: 1,
  timelineHasMore: true,
  timelineLoading: false,

  addToBasket: (item) => {
    const updated = [...get().basket.filter((b) => b.giftId !== item.giftId), item];
    set({ basket: updated });
    storageSet(BASKET_KEY, updated);
  },

  removeFromBasket: (giftId) => {
    const updated = get().basket.filter((b) => b.giftId !== giftId);
    set({ basket: updated });
    storageSet(BASKET_KEY, updated);
  },

  clearBasket: () => {
    set({ basket: [] });
    storageSet(BASKET_KEY, []);
  },

  loadOrders: async () => {
    set({ loading: true });
    try {
      const orders = await api.get<Order[]>('/orders');
      set({ orders, loading: false });
    } catch {
      set({ loading: false });
    }
  },

  loadTimelinePage: async () => {
    const { timelinePage, timelineHasMore, timelineLoading } = get();
    if (!timelineHasMore || timelineLoading) return;
    set({ timelineLoading: true });
    try {
      const result = await api.get<{ data: Order[]; hasMore: boolean; total: number }>(
        `/orders?page=${timelinePage}&limit=10`
      );
      const updated = [...get().timelineOrders, ...result.data];
      set({
        timelineOrders: updated,
        timelinePage: timelinePage + 1,
        timelineHasMore: result.hasMore,
        timelineLoading: false,
      });
      storageSet(TIMELINE_KEY, updated);
    } catch {
      set({ timelineLoading: false });
    }
  },

  resetTimeline: () => {
    set({ timelineOrders: [], timelinePage: 1, timelineHasMore: true });
    storageSet(TIMELINE_KEY, []);
  },

  checkout: async () => {
    set({ loading: true });
    try {
      const orders = await api.post<Order[]>('/orders/checkout', { items: get().basket });
      set({ orders: [...get().orders, ...orders], basket: [], loading: false });
      storageSet(BASKET_KEY, []);
      return orders;
    } catch (e) {
      set({ loading: false });
      throw e;
    }
  },

  basketTotal: () => get().basket.reduce((sum, i) => sum + i.price, 0),
}));

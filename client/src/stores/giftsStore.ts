import { create } from 'zustand';
import { api } from '@/utils/api.ts';
import type { Gift, ChatMessage } from '@/core/types/index.ts';

interface GiftsStore {
  gifts: Gift[];
  selectedPersonId: string | null;
  budget: number;
  messages: ChatMessage[];
  loading: boolean;
  chatLoading: boolean;
  error: string | null;
  loadSuggestions: (personId: string, budget?: number) => Promise<void>;
  loadGiftsOnly: (personId: string, budget: number) => Promise<void>;
  sendMessage: (personId: string, content: string) => Promise<void>;
  setBudget: (budget: number) => void;
  setPersonId: (id: string) => void;
  clearChat: () => void;
}

export const useGiftsStore = create<GiftsStore>((set, get) => ({
  gifts: [],
  selectedPersonId: null,
  budget: 100,
  messages: [],
  loading: false,
  chatLoading: false,
  error: null,

  loadSuggestions: async (personId, budget) => {
    set({ loading: true, error: null, selectedPersonId: personId, messages: [] });
    const b = budget ?? get().budget;
    try {
      const [gifts, initMsg] = await Promise.all([
        api.get<Gift[]>(`/gifts/suggest/${personId}?budget=${b}`),
        api.get<ChatMessage>(`/chat/init/${personId}`),
      ]);
      set({ gifts, messages: [initMsg], loading: false });
    } catch (e) {
      set({ error: (e as Error).message, loading: false });
    }
  },

  loadGiftsOnly: async (personId, budget) => {
    set({ loading: true, error: null });
    try {
      const gifts = await api.get<Gift[]>(`/gifts/suggest/${personId}?budget=${budget}`);
      set({ gifts, loading: false });
    } catch (e) {
      set({ error: (e as Error).message, loading: false });
    }
  },

  sendMessage: async (personId, content) => {
    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', content, timestamp: new Date().toISOString() };
    set((s) => ({ messages: [...s.messages, userMsg], chatLoading: true }));
    try {
      const res = await api.post<{ reply: string; gifts: Gift[] }>('/chat', { personId, message: content, budget: get().budget });
      const assistantMsg: ChatMessage = { id: (Date.now() + 1).toString(), role: 'assistant', content: res.reply, timestamp: new Date().toISOString() };
      set((s) => ({ messages: [...s.messages, assistantMsg], gifts: res.gifts, chatLoading: false }));
    } catch (e) {
      set({ error: (e as Error).message, chatLoading: false });
    }
  },

  setBudget: (budget) => set({ budget }),
  setPersonId: (id) => set({ selectedPersonId: id }),
  clearChat: () => set({ messages: [], gifts: [] }),
}));

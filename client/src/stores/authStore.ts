import { create } from 'zustand';
import { api } from '@/utils/api.ts';
import type { User } from '@/core/types/index.ts';

interface AuthStore {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<User>;
  register: (name: string, email: string, password: string) => Promise<User>;
  setUser: (user: User | null) => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  loading: false,
  error: null,

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const user = await api.post<User>('/auth/login', { email, password });
      set({ user, loading: false });
      return user;
    } catch (e) {
      const msg = (e as Error).message;
      set({ error: msg, loading: false });
      throw e;
    }
  },

  register: async (name, email, password) => {
    set({ loading: true, error: null });
    try {
      const user = await api.post<User>('/auth/register', { name, email, password });
      set({ user, loading: false });
      return user;
    } catch (e) {
      const msg = (e as Error).message;
      set({ error: msg, loading: false });
      throw e;
    }
  },

  setUser: (user) => set({ user }),
  clearError: () => set({ error: null }),
}));

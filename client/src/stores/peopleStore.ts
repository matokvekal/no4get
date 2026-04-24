import { create } from 'zustand';
import { api } from '@/utils/api.ts';
import { storageGet, storageSet } from '@/core/storage/index.ts';
import type { Person } from '@/core/types/index.ts';

const STORAGE_KEY = 'giftvibes_people';

interface PeopleStore {
  people: Person[];
  loading: boolean;
  error: string | null;
  loadPeople: () => Promise<void>;
  addPerson: (data: Omit<Person, 'id' | 'userId' | 'nextEventDate' | 'daysUntil'>) => Promise<void>;
  updatePerson: (id: string, data: Partial<Omit<Person, 'id' | 'userId' | 'nextEventDate' | 'daysUntil'>>) => Promise<void>;
  deletePerson: (id: string) => Promise<void>;
  getUpcoming: (limit?: number) => Person[];
}

export const usePeopleStore = create<PeopleStore>((set, get) => ({
  people: storageGet<Person[]>(STORAGE_KEY) ?? [],
  loading: false,
  error: null,

  loadPeople: async () => {
    set({ loading: true, error: null });
    try {
      const people = await api.get<Person[]>('/people');
      set({ people, loading: false });
      storageSet(STORAGE_KEY, people);
    } catch (e) {
      set({ error: (e as Error).message, loading: false });
    }
  },

  addPerson: async (data) => {
    set({ loading: true, error: null });
    try {
      const person = await api.post<Person>('/people', data);
      const updated = [...get().people, person];
      set({ people: updated, loading: false });
      storageSet(STORAGE_KEY, updated);
    } catch (e) {
      set({ error: (e as Error).message, loading: false });
      throw e;
    }
  },

  updatePerson: async (id, data) => {
    set({ loading: true, error: null });
    try {
      const person = await api.put<Person>(`/people/${id}`, data);
      const updated = get().people.map((p) => (p.id === id ? person : p));
      set({ people: updated, loading: false });
      storageSet(STORAGE_KEY, updated);
    } catch (e) {
      set({ error: (e as Error).message, loading: false });
      throw e;
    }
  },

  deletePerson: async (id) => {
    set({ loading: true, error: null });
    try {
      await api.delete(`/people/${id}`);
      const updated = get().people.filter((p) => p.id !== id);
      set({ people: updated, loading: false });
      storageSet(STORAGE_KEY, updated);
    } catch (e) {
      set({ error: (e as Error).message, loading: false });
      throw e;
    }
  },

  getUpcoming: (limit = 10) =>
    [...get().people]
      .sort((a, b) => a.daysUntil - b.daysUntil)
      .slice(0, limit),
}));

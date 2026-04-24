import { create } from 'zustand';

interface UIStore {
  activeTab: string;
  showAddFriend: boolean;
  setActiveTab: (tab: string) => void;
  openAddFriend: () => void;
  closeAddFriend: () => void;

  // contacts toolbar
  contactsPanel: 'none' | 'search' | 'sort';
  toggleContactsPanel: (panel: 'search' | 'sort') => void;
  closeContactsPanel: () => void;

  // burger menu + manage people
  showBurgerMenu: boolean;
  showManagePeople: boolean;
  openBurgerMenu: () => void;
  closeBurgerMenu: () => void;
  openManagePeople: () => void;
  closeManagePeople: () => void;
}

export const useUIStore = create<UIStore>((set, get) => ({
  activeTab: 'home',
  showAddFriend: false,
  setActiveTab: (tab) => set({ activeTab: tab }),
  openAddFriend: () => set({ showAddFriend: true }),
  closeAddFriend: () => set({ showAddFriend: false }),

  contactsPanel: 'none',
  toggleContactsPanel: (panel) =>
    set({ contactsPanel: get().contactsPanel === panel ? 'none' : panel }),
  closeContactsPanel: () => set({ contactsPanel: 'none' }),

  showBurgerMenu: false,
  showManagePeople: false,
  openBurgerMenu: () => set({ showBurgerMenu: true }),
  closeBurgerMenu: () => set({ showBurgerMenu: false }),
  openManagePeople: () => set({ showManagePeople: true, showBurgerMenu: false }),
  closeManagePeople: () => set({ showManagePeople: false }),
}));

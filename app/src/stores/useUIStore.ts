import { create } from 'zustand';

type UIState = {
  isSidebarOpen: boolean;
  isModalOpen: boolean;
  theme: 'light' | 'dark';

  toggleSidebar: () => void;
  openModal: () => void;
  closeModal: () => void;
  toggleTheme: () => void;
};

export const useUIStore = create<UIState>((set) => ({
  isSidebarOpen: false,
  isModalOpen: false,
  theme: 'light',

  toggleSidebar: () =>
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),

  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),

  toggleTheme: () =>
    set((state) => ({
      theme: state.theme === 'light' ? 'dark' : 'light',
    })),
}));
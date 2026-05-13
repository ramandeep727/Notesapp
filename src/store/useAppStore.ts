import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserProfile {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
}

interface Notebook {
  id: string;
  title: string;
  color: string;
  cover_url?: string;
  category: string;
  last_modified: string;
  is_favorite: boolean;
}

interface AppState {
  user: UserProfile | null;
  notebooks: Notebook[];
  activeNotebookId: string | null;
  activePageId: string | null;
  sidebarCollapsed: boolean;
  
  setUser: (user: UserProfile | null) => void;
  setNotebooks: (notebooks: Notebook[]) => void;
  setActiveNotebook: (id: string | null) => void;
  setActivePage: (id: string | null) => void;
  toggleSidebar: () => void;
  addNotebook: (notebook: Notebook) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      user: null,
      notebooks: [],
      activeNotebookId: null,
      activePageId: null,
      sidebarCollapsed: false,

      setUser: (user) => set({ user }),
      setNotebooks: (notebooks) => set({ notebooks }),
      setActiveNotebook: (id) => set({ activeNotebookId: id }),
      setActivePage: (id) => set({ activePageId: id }),
      toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
      addNotebook: (notebook) => set((state) => ({ notebooks: [notebook, ...state.notebooks] })),
    }),
    {
      name: 'lumina-storage',
    }
  )
);

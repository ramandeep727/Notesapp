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
  coverStyle: string;
  coverColor: string;
  paperStyle: 'blank' | 'dotted' | 'lined' | 'graph';
  paperColor: string;
  paperSpacing: number;
  category: string;
  last_modified: string;
  is_favorite: boolean;
  notes_count: number;
}

interface AppState {
  user: UserProfile | null;
  notebooks: Notebook[];
  activeNotebookId: string | null;
  activePageId: string | null;
  sidebarCollapsed: boolean;
  isTemplateModalOpen: boolean;
  
  setUser: (user: UserProfile | null) => void;
  setNotebooks: (notebooks: Notebook[]) => void;
  setActiveNotebook: (id: string | null) => void;
  setActivePage: (id: string | null) => void;
  toggleSidebar: () => void;
  setTemplateModalOpen: (open: boolean) => void;
  addNotebook: (notebook: Notebook) => void;
  updateNotebook: (id: string, updates: Partial<Notebook>) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      user: null,
      notebooks: [],
      activeNotebookId: null,
      activePageId: null,
      sidebarCollapsed: false,
      isTemplateModalOpen: false,

      setUser: (user) => set({ user }),
      setNotebooks: (notebooks) => set({ notebooks }),
      setActiveNotebook: (id) => set({ activeNotebookId: id }),
      setActivePage: (id) => set({ activePageId: id }),
      toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
      setTemplateModalOpen: (open) => set({ isTemplateModalOpen: open }),
      addNotebook: (notebook) => set((state) => ({ notebooks: [notebook, ...state.notebooks] })),
      updateNotebook: (id, updates) => set((state) => ({
        notebooks: state.notebooks.map(nb => nb.id === id ? { ...nb, ...updates } : nb)
      })),
    }),
    {
      name: 'lumina-storage',
    }
  )
);


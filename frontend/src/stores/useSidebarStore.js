import { create } from 'zustand';

const useSidebarStore = create((set) => ({
  isCollapsed: false,

  toggleSidebar: () =>
    set((state) => ({
      isCollapsed: !state.isCollapsed,
    })),

  setCollapsed: (value) =>
    set((state) => ({
      isCollapsed: value,
    })),
}));

export default useSidebarStore;

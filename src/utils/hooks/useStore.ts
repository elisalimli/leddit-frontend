import create from "zustand";

export const useStore = create((set) => ({
  activeNavLink: "/",
  setActiveNavLink: (path: string) => set(() => ({ activeNavLink: path })),
}));

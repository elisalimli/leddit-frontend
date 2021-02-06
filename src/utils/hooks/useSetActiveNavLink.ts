import { useEffect } from "react";
import { StoreApi } from "zustand";
import { useStore } from "./useStore";

export const useSetActiveNavLink = (path: string) => {
  const setActiveLink = useStore((state: any) => state.setActiveNavLink);

  useEffect(() => {
    //ts ignore
    setActiveLink(path);
  }, []);
  return;
};

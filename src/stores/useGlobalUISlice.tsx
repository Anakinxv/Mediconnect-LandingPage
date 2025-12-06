import { type StateCreator } from "zustand";
import { persist } from "zustand/middleware";

export type GlobalUISlice = {
  isDarkMode: boolean;
  toggleDarkMode: () => void;

  language: string;
  setLanguage: (lang: string) => void;

  isloading: boolean;
  setIsLoading: (loading: boolean) => void;

  toast: {
    message: string;
    type: "success" | "error" | "info";
    open: boolean;
  };
  setToast: (toast: {
    message: string;
    type: "success" | "error" | "info";
    open: boolean;
  }) => void;
};

export const createGlobalUISlice: StateCreator<
  GlobalUISlice,
  [],
  [["zustand/persist", GlobalUISlice]],
  GlobalUISlice
> = persist(
  (set) => ({
    isDarkMode: false,
    toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),

    language: "es",
    setLanguage: (lang: string) => set({ language: lang }),

    isloading: false,
    setIsLoading: (loading: boolean) => set({ isloading: loading }),
    toast: {
      message: "",
      type: "info",
      open: false,
    },
    setToast: (toast: {
      message: string;
      type: "success" | "error" | "info";
      open: boolean;
    }) => set({ toast }),
  }),
  {
    name: "global-ui-slice",
  }
);

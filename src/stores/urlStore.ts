import { create } from "zustand";

interface UrlStore {
  url: string;
  iterations: number;
  setUrl: (url: string) => void;
  setIterations: (iterations: number) => void;
}

export const useUrlStore = create<UrlStore>((set) => ({
  url: "",
  iterations: 4,
  setUrl: (url) => set({ url }),
  setIterations: (iterations) => set({ iterations }),
}));

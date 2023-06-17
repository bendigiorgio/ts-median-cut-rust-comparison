import { create } from "zustand";

interface UrlStore {
  rustUrl: string;
  rustIterations: number;
  rustEndpoint: string;
  setRustUrl: (url: string) => void;
  setRustIterations: (iterations: number) => void;
  setRustEndpoint: (endpoint: string) => void;
  tsUrl: string;
  tsIterations: number;
  tsEndpoint: string;
  setTsUrl: (url: string) => void;
  setTsIterations: (iterations: number) => void;
  setTsEndpoint: (endpoint: string) => void;
}

export const useUrlStore = create<UrlStore>((set) => ({
  rustUrl: "",
  rustIterations: 4,
  rustEndpoint: "http://127.0.0.1:8000/make_palette_image?id=1234",
  setRustUrl: (rustUrl) => set({ rustUrl }),
  setRustIterations: (rustIterations) => set({ rustIterations }),
  setRustEndpoint: (rustEndpoint) => set({ rustEndpoint }),

  tsUrl: "",
  tsIterations: 4,
  tsEndpoint: "http://127.0.0.1:8000/make_palette_image?id=1234",
  setTsUrl: (tsUrl) => set({ tsUrl }),
  setTsIterations: (tsIterations) => set({ tsIterations }),
  setTsEndpoint: (tsEndpoint) => set({ tsEndpoint }),
}));

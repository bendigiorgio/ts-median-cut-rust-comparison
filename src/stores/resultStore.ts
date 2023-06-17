import { create } from "zustand";

interface ResultStore {
  rustLoading: boolean;
  rustResult: string;
  rustTime: number;
  tsLoading: boolean;
  tsResult: string;
  tsTime: number;
  setRustResult: (rustResult: string) => void;
  setTsResult: (tsResult: string) => void;
  setRustLoading: (rustLoading: boolean) => void;
  setTsLoading: (tsLoading: boolean) => void;
}

export const useResultStore = create<ResultStore>((set) => ({
  rustLoading: false,
  rustResult: "",
  rustTime: 0,
  tsLoading: false,
  tsResult: "",
  tsTime: 0,
  setRustResult: (rustResult) => set({ rustResult }),
  setTsResult: (tsResult) => set({ tsResult }),
  setRustLoading: (rustLoading) => set({ rustLoading }),
  setTsLoading: (tsLoading) => set({ tsLoading }),
}));

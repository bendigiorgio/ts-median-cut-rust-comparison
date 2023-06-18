import { create } from "zustand";

export type ResponseType = {
  url?: string;
  colors: string[];
  internal_time: number;
} | null;

interface ResultStore {
  rustLoading: boolean;
  rustResult: ResponseType;
  rustTime: number;
  rustInteralTime: number;
  tsLoading: boolean;
  tsResult: ResponseType;
  tsTime: number;
  tsInternalTime: number;

  setRustResult: (rustResult: ResponseType) => void;
  setRustLoading: (rustLoading: boolean) => void;
  setRustTime: (rustTime: number) => void;
  setRustInternalTime: (rustInternalTime: number) => void;

  setTsResult: (tsResult: ResponseType) => void;
  setTsLoading: (tsLoading: boolean) => void;
  setTsTime: (tsTime: number) => void;
  setTsInternalTime: (tsInternalTime: number) => void;
}

export const useResultStore = create<ResultStore>((set) => ({
  rustLoading: false,
  rustResult: null,
  rustTime: 0,
  rustInteralTime: 0,
  tsLoading: false,
  tsResult: null,
  tsTime: 0,
  tsInternalTime: 0,

  setRustResult: (rustResult) => set({ rustResult }),
  setRustLoading: (rustLoading) => set({ rustLoading }),
  setRustTime: (rustTime) => set({ rustTime }),
  setRustInternalTime: (rustInteralTime) => set({ rustInteralTime }),

  setTsResult: (tsResult) => set({ tsResult }),
  setTsLoading: (tsLoading) => set({ tsLoading }),
  setTsTime: (tsTime) => set({ tsTime }),
  setTsInternalTime: (tsInternalTime) => set({ tsInternalTime }),
}));

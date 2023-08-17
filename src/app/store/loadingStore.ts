import { create } from 'zustand';

interface ILoadingStore {
  pool: {
    init: boolean;
    normal: boolean;
  };
  startLoading(key: keyof ILoadingStore['pool']): void;
  finishLoading(key: keyof ILoadingStore['pool']): void;
}

export const useLoadingStore = create<ILoadingStore>((set) => ({
  pool: {
    init: true,
    normal: false,
  },
  startLoading: (key) => {
    set((state) => ({ ...state, pool: { ...state.pool, [key]: true } }));
  },
  finishLoading: (key) => {
    set((state) => ({ ...state, pool: { ...state.pool, [key]: false } }));
  },
}));

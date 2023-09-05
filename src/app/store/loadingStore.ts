import { createZustandStore } from './zustand.lib';

interface ILoadingStore {
  pool: {
    init: boolean;
    normal: boolean;
  };
  startLoading(key: keyof ILoadingStore['pool']): void;
  finishLoading(key: keyof ILoadingStore['pool']): void;
}

export const useLoadingStore = createZustandStore<ILoadingStore>((set) => ({
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

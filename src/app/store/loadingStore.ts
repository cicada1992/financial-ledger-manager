import { create } from 'zustand';

interface IUserStore {
  queue: string[];
  startLoading(key: string): void;
  finishLoading(key: string): void;
}

export const useLoadingStore = create<IUserStore>((set) => ({
  queue: [''],
  startLoading: (key: string) => {
    set((state) => ({ queue: [...state.queue, key] }));
  },
  finishLoading: (key: string) => {
    set((state) => {
      console.log(
        key,
        state.queue.filter((q) => q !== key),
      );
      return { queue: state.queue.filter((q) => q !== key) };
    });
  },
}));

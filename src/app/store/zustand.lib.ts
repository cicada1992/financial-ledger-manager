import { create, StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';

/** devtools 래핑 (개발환경에서만 동작하도록) */
export const createZustandStore = <T>(store: StateCreator<T>) =>
  create(devtools(store, { enabled: true }));

import { create, StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';

import { Config } from '../lib/Config';

/** devtools 래핑 (개발환경에서만 동작하도록) */
export const createZustandStore = <T>(name: string, store: StateCreator<T>) =>
  create(devtools(store, { name, enabled: Config.isDev() }));

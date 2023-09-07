import dayjs from 'dayjs';

import { useLoadingStore } from './loadingStore';
import { useUserStore } from './userStore';
import { createZustandStore } from './zustand.lib';
import AnnuallyAPI from '../api/AnnuallyAPI';
import { IAnnually, ICreateAnnuallyBody, IUpdateAnnuallyBody } from '../api/AnnuallyAPI/types';
import ErrorManager from '../lib/ErrorManager';

const LOADING_KEY = 'normal';

interface IAnnuallyStore {
  currentYear: number;
  list: IAnnually[];
  setList(list: IAnnually[]): void;
  setToPrevYear(): void;
  setToNextYear(): void;

  fetchList(userEmail: string, year: number): Promise<void>;
  create(body: ICreateAnnuallyBody, onSuccess: () => void): Promise<void>;
  update(body: IUpdateAnnuallyBody, onSuccess: () => void): Promise<void>;
  remove(ids: string[], onSuccess: () => void): Promise<void>;
  copyData(userEmail: string, targetYear: number): Promise<void>;
}

export const useAnnuallyStore = createZustandStore<IAnnuallyStore>(
  'useAnnuallyStore',
  (set, get) => {
    return {
      currentYear: dayjs().get('year'),
      list: [],

      // setters
      setToPrevYear: () =>
        set((state) => ({
          ...state,
          currentYear: state.currentYear - 1,
        })),
      setToNextYear: () =>
        set((state) => ({
          ...state,
          currentYear: state.currentYear + 1,
        })),
      setList: (list) => set({ list }),

      // fetchers
      fetchList: async (userEmail, year) => {
        const loadingStore = useLoadingStore.getState();
        try {
          loadingStore.startLoading(LOADING_KEY);
          const list = await AnnuallyAPI.getList(userEmail, year);
          set({ list });
        } catch (e) {
          ErrorManager.alert(e);
        } finally {
          loadingStore.finishLoading(LOADING_KEY);
        }
      },

      // mutators
      create: async (body, onSuccess) => {
        const loadingStore = useLoadingStore.getState();
        loadingStore.startLoading(LOADING_KEY);
        try {
          const list = await AnnuallyAPI.create(body, get().currentYear);
          set({ list });
          onSuccess();
        } catch (e) {
          ErrorManager.alert(e);
        } finally {
          loadingStore.finishLoading(LOADING_KEY);
        }
      },
      update: async (body, onSuccess) => {
        const loadingStore = useLoadingStore.getState();
        loadingStore.startLoading(LOADING_KEY);
        try {
          const list = await AnnuallyAPI.update(body, get().currentYear);
          set({ list });
          onSuccess();
        } catch (e) {
          ErrorManager.alert(e);
        } finally {
          loadingStore.finishLoading(LOADING_KEY);
        }
      },
      remove: async (ids, onSuccess) => {
        const userStore = useUserStore.getState();
        const loadingStore = useLoadingStore.getState();
        loadingStore.startLoading(LOADING_KEY);
        try {
          await Promise.all(ids.map((id) => AnnuallyAPI.remove(id)));
          const list = await AnnuallyAPI.getList(userStore.userInfo.email, get().currentYear);
          set({ list });
          onSuccess();
        } catch (e) {
          ErrorManager.alert(e);
        } finally {
          loadingStore.finishLoading(LOADING_KEY);
        }
      },
      copyData: async (userEmail, targetYear) => {
        const loadingStore = useLoadingStore.getState();
        loadingStore.startLoading(LOADING_KEY);
        try {
          const list = await AnnuallyAPI.copy(userEmail, targetYear);
          set({ list });
        } catch (e) {
          ErrorManager.alert(e);
        } finally {
          loadingStore.finishLoading(LOADING_KEY);
        }
      },
    };
  },
);

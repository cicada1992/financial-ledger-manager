import { create } from 'zustand';

import { useLoadingStore } from './loadingStore';
import MonthlyAPI from '../api/MonthlyAPI';
import { ICreateMonthlyBody, IMonthly, IUpdateMonthlyBody } from '../api/MonthlyAPI/types';
import ErrorManager from '../lib/ErrorManager';

const LOADING_KEY = 'normal';

interface IMonthlyStore {
  list: IMonthly[];
  setList(list: IMonthly[]): void;
  fetchList(userEmail: string): Promise<void>;
  create(body: ICreateMonthlyBody, onSuccess: () => void): Promise<void>;
  update(body: IUpdateMonthlyBody, onSuccess: () => void): Promise<void>;
  remove(ids: string[], onSuccess: () => void): Promise<void>;
}

const state: IMonthly[] = [];

export const useMonthlyStore = create<IMonthlyStore>((set) => ({
  list: state,
  fetchList: async (userEmail: string) => {
    const loadingStore = useLoadingStore.getState();
    try {
      loadingStore.startLoading(LOADING_KEY);
      const list = await MonthlyAPI.getList(userEmail);
      set({ list });
    } catch (e) {
      ErrorManager.alert(e);
    } finally {
      loadingStore.finishLoading(LOADING_KEY);
    }
  },
  create: async (body, onSuccess) => {
    const loadingStore = useLoadingStore.getState();
    loadingStore.startLoading(LOADING_KEY);
    try {
      const list = await MonthlyAPI.create(body);
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
      const list = await MonthlyAPI.update(body);
      set({ list });
      onSuccess();
    } catch (e) {
      ErrorManager.alert(e);
    } finally {
      loadingStore.finishLoading(LOADING_KEY);
    }
  },
  remove: async (ids, onSuccess) => {
    const loadingStore = useLoadingStore.getState();
    loadingStore.startLoading(LOADING_KEY);
    try {
      const [list] = await Promise.all(ids.map((id) => MonthlyAPI.remove(id)));
      set({ list });
      onSuccess();
    } catch (e) {
      ErrorManager.alert(e);
    } finally {
      loadingStore.finishLoading(LOADING_KEY);
    }
  },
  setList: (list) => set({ list }),
}));

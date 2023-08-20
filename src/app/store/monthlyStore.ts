import { create } from 'zustand';

import { useLoadingStore } from './loadingStore';
import MonthlyAPI from '../api/MonthlyAPI';
import { ICreateMonthlyBody, IMonthly, IUpdateMonthlyBody } from '../api/MonthlyAPI/types';
import ErrorManager from '../lib/ErrorManager';
import { DateUtils } from '../utils/dateUtils';

const LOADING_KEY = 'normal';

interface IMonthlyStore {
  baseMonth: number;
  list: IMonthly[];
  setList(list: IMonthly[]): void;
  setToPrevMonth(): void;
  setToNextMonth(): void;

  fetchList(userEmail: string, month: number): Promise<void>;
  create(body: ICreateMonthlyBody, onSuccess: () => void): Promise<void>;
  update(body: IUpdateMonthlyBody, onSuccess: () => void): Promise<void>;
  remove(ids: string[], onSuccess: () => void): Promise<void>;
}

export const useMonthlyStore = create<IMonthlyStore>((set) => {
  const dateInfo = DateUtils.getKoreanDateInfo();
  return {
    baseMonth: dateInfo.startMonth,
    list: [],

    // setters
    setToPrevMonth: () =>
      set((state) => ({
        ...state,
        baseMonth: state.baseMonth - 1,
      })),
    setToNextMonth: () =>
      set((state) => ({
        ...state,
        baseMonth: state.baseMonth + 1,
      })),
    setList: (list) => set({ list }),

    // fetchers
    fetchList: async (userEmail: string, month: number) => {
      const loadingStore = useLoadingStore.getState();
      try {
        loadingStore.startLoading(LOADING_KEY);
        const list = await MonthlyAPI.getList(userEmail, month);
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
  };
});

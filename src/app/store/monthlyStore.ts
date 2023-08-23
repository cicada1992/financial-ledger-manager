import dayjs, { Dayjs } from 'dayjs';
import { create } from 'zustand';

import { useLoadingStore } from './loadingStore';
import { useUserStore } from './userStore';
import MonthlyAPI from '../api/MonthlyAPI';
import { ICreateMonthlyBody, IMonthly, IUpdateMonthlyBody } from '../api/MonthlyAPI/types';
import ErrorManager from '../lib/ErrorManager';
import { DateUtils } from '../utils/dateUtils';

const LOADING_KEY = 'normal';

interface IMonthlyStore {
  date: Dayjs;
  list: IMonthly[];
  setList(list: IMonthly[]): void;
  setToPrevMonth(): void;
  setToNextMonth(): void;

  fetchList(userEmail: string, date: Dayjs): Promise<void>;
  create(body: ICreateMonthlyBody, onSuccess: () => void): Promise<void>;
  update(body: IUpdateMonthlyBody, onSuccess: () => void): Promise<void>;
  remove(ids: string[], onSuccess: () => void): Promise<void>;
  copyData(userEmail: string, date: Dayjs): Promise<void>;
}

export const useMonthlyStore = create<IMonthlyStore>((set, get) => {
  return {
    date: dayjs(),
    list: [],

    // setters
    setToPrevMonth: () =>
      set((state) => ({
        ...state,
        date: state.date.subtract(1, 'month'),
      })),
    setToNextMonth: () =>
      set((state) => ({
        ...state,
        date: state.date.add(1, 'month'),
      })),
    setList: (list) => set({ list }),

    // fetchers
    fetchList: async (userEmail, date) => {
      const userStore = useUserStore.getState();
      const loadingStore = useLoadingStore.getState();
      try {
        loadingStore.startLoading(LOADING_KEY);
        const list = await MonthlyAPI.getList(
          userEmail,
          DateUtils.getDateParam(date, userStore.userInfo.referenceDate),
        );
        set({ list });
      } catch (e) {
        ErrorManager.alert(e);
      } finally {
        loadingStore.finishLoading(LOADING_KEY);
      }
    },

    // mutators
    create: async (body, onSuccess) => {
      const { date } = get();
      const userStore = useUserStore.getState();
      const loadingStore = useLoadingStore.getState();
      loadingStore.startLoading(LOADING_KEY);
      try {
        const list = await MonthlyAPI.create(
          body,
          DateUtils.getDateParam(date, userStore.userInfo.referenceDate),
        );
        set({ list });
        onSuccess();
      } catch (e) {
        ErrorManager.alert(e);
      } finally {
        loadingStore.finishLoading(LOADING_KEY);
      }
    },
    update: async (body, onSuccess) => {
      const { date } = get();
      const userStore = useUserStore.getState();
      const loadingStore = useLoadingStore.getState();
      loadingStore.startLoading(LOADING_KEY);
      try {
        const list = await MonthlyAPI.update(
          body,
          DateUtils.getDateParam(date, userStore.userInfo.referenceDate),
        );
        set({ list });
        onSuccess();
      } catch (e) {
        ErrorManager.alert(e);
      } finally {
        loadingStore.finishLoading(LOADING_KEY);
      }
    },
    remove: async (ids, onSuccess) => {
      const { date } = get();
      const userStore = useUserStore.getState();
      const loadingStore = useLoadingStore.getState();
      loadingStore.startLoading(LOADING_KEY);
      try {
        await Promise.all(ids.map((id) => MonthlyAPI.remove(id)));
        const list = await MonthlyAPI.getList(
          userStore.userInfo.email,
          DateUtils.getDateParam(date, userStore.userInfo.referenceDate),
        );
        set({ list });
        onSuccess();
      } catch (e) {
        ErrorManager.alert(e);
      } finally {
        loadingStore.finishLoading(LOADING_KEY);
      }
    },
    copyData: async (userEmail, date) => {
      const userStore = useUserStore.getState();
      const loadingStore = useLoadingStore.getState();
      loadingStore.startLoading(LOADING_KEY);
      try {
        const list = await MonthlyAPI.copy(
          userEmail,
          DateUtils.getDateParam(date, userStore.userInfo.referenceDate),
        );
        set({ list });
      } catch (e) {
        ErrorManager.alert(e);
      } finally {
        loadingStore.finishLoading(LOADING_KEY);
      }
    },
  };
});

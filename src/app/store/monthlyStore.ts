import { create } from 'zustand';

import MonthlyAPI from '../api/MonthlyAPI';
import { ICreateMonthlyBody, IMonthly, IUpdateMonthlyBody } from '../api/MonthlyAPI/types';

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
    const list = await MonthlyAPI.getList(userEmail);
    set({ list });
  },
  create: async (body, onSuccess) => {
    const list = await MonthlyAPI.create(body);
    set({ list });
    onSuccess();
  },
  update: async (body, onSuccess) => {
    const list = await MonthlyAPI.update(body);
    set({ list });
    onSuccess();
  },
  remove: async (ids, onSuccess) => {
    const [list] = await Promise.all(ids.map((id) => MonthlyAPI.remove(id)));
    set({ list });
    onSuccess();
  },
  setList: (list) => set({ list }),
}));

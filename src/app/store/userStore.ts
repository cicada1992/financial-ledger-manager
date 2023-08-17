import { create } from 'zustand';

import { useLoadingStore } from './loadingStore';
import AuthAPI from '../api/AuthAPI';
import { IUserInfo } from '../api/AuthAPI/types';
import ErrorManager from '../lib/ErrorManager';

const LOADING_KEY = 'init';

interface IUserStore {
  userInfo: IUserInfo;
  fetchUserInfo(): Promise<void>;
}

const state = {
  email: '',
  username: '',
};

export const useUserStore = create<IUserStore>((set) => ({
  userInfo: state,
  fetchUserInfo: async () => {
    const loadingStore = useLoadingStore.getState();
    try {
      loadingStore.startLoading(LOADING_KEY);
      const userInfo = await AuthAPI.getUserInfo();
      set({ userInfo });
    } catch (e) {
      // no-op
    } finally {
      loadingStore.finishLoading(LOADING_KEY);
    }
  },
}));

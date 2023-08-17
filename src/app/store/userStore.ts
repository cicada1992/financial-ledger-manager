import { create } from 'zustand';

import { useLoadingStore } from './loadingStore';
import AuthAPI from '../api/AuthAPI';
import { IUserInfo } from '../api/AuthAPI/types';
import ErrorManager from '../lib/ErrorManager';

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
      loadingStore.startLoading('fetchUserInfo');
      const userInfo = await AuthAPI.getUserInfo();
      set({ userInfo });
    } catch (e) {
      ErrorManager.alert(e);
    } finally {
      loadingStore.finishLoading('fetchUserInfo');
    }
  },
}));

import { create } from 'zustand';

import { useLoadingStore } from './loadingStore';
import AuthAPI from '../api/AuthAPI';
import { IUserInfo, IUserPayload } from '../api/AuthAPI/types';
import ErrorManager from '../lib/ErrorManager';

const LOADING_KEY = 'init';

interface IUserStore {
  userInfo: IUserInfo;

  fetchUserInfo(): Promise<void>;
  register(body: IUserPayload): Promise<void>;
  update(body: Partial<IUserPayload> & { password: string }): Promise<void>;
}

export const useUserStore = create<IUserStore>((set, get) => ({
  userInfo: {
    email: '',
    username: '',
    referenceDate: 0,
  },
  fetchUserInfo: async () => {
    const loadingStore = useLoadingStore.getState();
    try {
      loadingStore.startLoading(LOADING_KEY);
      const userInfo = await AuthAPI.getUserInfo();
      set((state) => ({ ...state, userInfo: { ...userInfo } }));
    } catch (e) {
      // no-op
    } finally {
      loadingStore.finishLoading(LOADING_KEY);
    }
  },
  register: async (body: IUserPayload) => {
    const loadingStore = useLoadingStore.getState();
    try {
      loadingStore.startLoading(LOADING_KEY);
      await AuthAPI.signUp(body);
    } catch (e) {
      ErrorManager.alert(e);
    } finally {
      loadingStore.finishLoading(LOADING_KEY);
    }
  },
  update: async (body: Partial<IUserPayload> & { password: string }) => {
    const loadingStore = useLoadingStore.getState();
    const { userInfo } = get();
    try {
      loadingStore.startLoading(LOADING_KEY);
      await AuthAPI.update({ ...userInfo, ...body });
    } catch (e) {
      ErrorManager.alert(e);
    } finally {
      loadingStore.finishLoading(LOADING_KEY);
    }
  },
}));

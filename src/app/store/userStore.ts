import { create } from 'zustand';

import AuthAPI from '../api/AuthAPI';
import { IUserInfo } from '../api/AuthAPI/types';

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
    const userInfo = await AuthAPI.getUserInfo();
    set({ userInfo });
  },
}));

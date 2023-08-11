import { LocalStorageHelper } from '@/app/lib/LocalStorageHelper';

import { IUserPayload, ISignUpResponse, ILoginResponse, IUserInfo } from './types';
import BaseAPI from '../BaseAPI';

namespace AuthAPI {
  const api = new BaseAPI('/auth');

  export async function signUp(body: IUserPayload): Promise<void> {
    const { accessToken } = await api.post<ISignUpResponse>('/register', body);
    LocalStorageHelper.setJWT(accessToken);
    window.location.reload();
  }

  export async function login(body: Pick<IUserPayload, 'email' | 'password'>): Promise<void> {
    const { accessToken } = await api.post<ILoginResponse>('/login', body);
    LocalStorageHelper.setJWT(accessToken);
    window.location.reload();
  }

  export function getUserInfo(): Promise<IUserInfo> {
    return api.get('/authenticated');
  }
}

export default AuthAPI;

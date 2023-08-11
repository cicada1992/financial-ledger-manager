'use client';

import React, { useEffect } from 'react';

import AuthAPI from '../api/AuthAPI';
import { IUserInfo } from '../api/AuthAPI/types';

export const AuthContext = React.createContext<{
  user: IUserInfo | null;
}>({
  user: null,
});

interface IProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<IProps> = ({ children }) => {
  const [user, setUser] = React.useState<IUserInfo | null>(null);

  useEffect(() => {
    fetchAuth();
  }, []);

  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;

  async function fetchAuth() {
    try {
      const res = await AuthAPI.getUserInfo();
      setUser(res);
    } catch {
      setUser(null);
    }
  }
};

export default AuthProvider;

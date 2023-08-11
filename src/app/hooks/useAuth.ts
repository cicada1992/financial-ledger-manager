import { useContext } from 'react';

import { AuthContext } from '../components/AuthContainer';

export const useUserInfo = () => {
  const { user } = useContext(AuthContext);
  return user;
};

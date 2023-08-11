'use client';

import React from 'react';

import { useUserInfo } from '@/app/hooks/useAuth';

import { main } from './pageContainer.css';
import LoginButton from '../Login';

interface IProps {
  children: React.ReactNode;
}

const PageContainer: React.FC<IProps> = ({ children }) => {
  const { userInfo } = useUserInfo();
  return <main className={main}>{userInfo ? children : renderLandingPage()}</main>;

  function renderLandingPage() {
    return (
      <>
        <LoginButton />
      </>
    );
  }
};

export default PageContainer;

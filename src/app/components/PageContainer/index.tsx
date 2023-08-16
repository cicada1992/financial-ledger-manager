'use client';

import React, { useEffect } from 'react';

import { useUserStore } from '@/app/store/userStore';

import { main } from './pageContainer.css';
import LoginButton from '../Login';

interface IProps {
  children: React.ReactNode;
}

const PageContainer: React.FC<IProps> = ({ children }) => {
  const { userInfo, fetchUserInfo } = useUserStore();
  const hasUserInfo = userInfo.email && userInfo.username;

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return <main className={main}>{hasUserInfo ? children : renderLandingPage()}</main>;

  function renderLandingPage() {
    return (
      <>
        <LoginButton />
      </>
    );
  }
};

export default PageContainer;

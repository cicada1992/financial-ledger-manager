'use client';

import { CircularProgress } from '@nextui-org/react';
import React, { CSSProperties, useEffect } from 'react';

import { useLoadingStore } from '@/app/store/loadingStore';
import { useUserStore } from '@/app/store/userStore';

import { main } from './pageContainer.css';
import LoginButton from '../Login';

interface IProps {
  children: React.ReactNode;
}

const PageContainer: React.FC<IProps> = ({ children }) => {
  const { userInfo, fetchUserInfo } = useUserStore();
  const loadingPool = useLoadingStore((state) => state.pool);
  const isInitializing = loadingPool.init;
  const isProcessing = loadingPool.normal;
  const hasUserInfo = userInfo.email && userInfo.username;
  const processingStyle: CSSProperties | undefined = isProcessing
    ? { opacity: 0.7, pointerEvents: 'none' }
    : undefined;

  useEffect(() => {
    fetchUserInfo();
  }, []);

  if (isInitializing) return <main className={main}>Initializing...</main>;
  if (!hasUserInfo) return <LoginButton />;
  return (
    <main className={main} style={processingStyle}>
      {isProcessing && (
        <CircularProgress
          style={{ position: 'absolute', margin: '0 auto', width: '100%', zIndex: 999 }}
        />
      )}
      {children}
    </main>
  );
};

export default PageContainer;

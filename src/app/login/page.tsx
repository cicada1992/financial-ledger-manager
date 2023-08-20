'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

import LoginForm from './LoginForm';
import PageContainer from '../components/PageContainer';
import { useUserStore } from '../store/userStore';

const Loan: React.FC = () => {
  const router = useRouter();
  const isLoginedAlready = useUserStore((state) =>
    Boolean(state.userInfo.email && state.userInfo.username),
  );

  useEffect(() => {
    if (isLoginedAlready) router.replace('/');
  }, [isLoginedAlready]);

  return (
    <PageContainer>
      <LoginForm />
    </PageContainer>
  );
};
export default Loan;

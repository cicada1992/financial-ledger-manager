'use client';
import { Spacer } from '@nextui-org/react';
import React, { useEffect } from 'react';

import { useMonthlyStore } from '@/app/store/monthlyStore';
import { useUserStore } from '@/app/store/userStore';

import MonthlyMonthController from './MonthlyMonthController';
import MonthlyProgress from './MonthlyProgress';
import MonthlySummary from './MonthlySummary';
import MonthlyTable from './MonthlyTable';
import PageContainer from '../components/PageContainer';

export const TYPE_AND_LABEL_MAPPINGS: Record<'INCOME' | 'SPEND', string> = {
  INCOME: '수입',
  SPEND: '지출',
};

const SPACE = 6;

const MonthlyPage: React.FC = () => {
  const userEmail = useUserStore((state) => state.userInfo.email);
  const monthlyStore = useMonthlyStore();

  useEffect(() => {
    if (!userEmail) return;
    monthlyStore.fetchList(userEmail, monthlyStore.date);
  }, [userEmail, monthlyStore.date]);

  return (
    <PageContainer>
      <MonthlyMonthController />
      <Spacer y={SPACE} />
      <MonthlyProgress title="진척도" />
      <Spacer y={SPACE} />
      <MonthlyTable
        title={TYPE_AND_LABEL_MAPPINGS['INCOME']}
        rows={monthlyStore.list.filter(({ type }) => type === 'INCOME')}
        type="INCOME"
      />
      <Spacer y={SPACE} />
      <MonthlyTable
        title={TYPE_AND_LABEL_MAPPINGS['SPEND']}
        rows={monthlyStore.list.filter(({ type }) => type === 'SPEND')}
        type="SPEND"
      />
      <Spacer y={SPACE} />
      <MonthlySummary data={monthlyStore.list} />
    </PageContainer>
  );
};
export default MonthlyPage;

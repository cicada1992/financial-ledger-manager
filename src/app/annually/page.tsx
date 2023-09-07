'use client';
import { Spacer } from '@nextui-org/react';
import React, { useEffect } from 'react';

import { useUserStore } from '@/app/store/userStore';

import AnnuallySummary from './AnnuallySummary';
import AnnuallyTable from './AnnuallyTable';
import AnnualyYearController from './AnnuallyYearController';
import { IMonthly } from '../api/MonthlyAPI/types';
import PageContainer from '../components/PageContainer';
import { useAnnuallyStore } from '../store/annuallyStore';

export const TYPE_AND_LABEL_MAPPINGS: Record<IMonthly['type'], string> = {
  INCOME: '수입',
  SPEND: '지출',
};

const SPACE = 4;

const MonthlyPage: React.FC = () => {
  const userEmail = useUserStore((state) => state.userInfo.email);
  const annuallyStore = useAnnuallyStore();

  useEffect(() => {
    if (!userEmail) return;
    annuallyStore.fetchList(userEmail, annuallyStore.currentYear);
  }, [userEmail, annuallyStore.currentYear]);

  return (
    <>
      <PageContainer>
        {/* Monthly 페이지 헤더 */}
        <AnnualyYearController />
        <Spacer y={SPACE} />
        <AnnuallyTable
          title={TYPE_AND_LABEL_MAPPINGS['INCOME']}
          rows={annuallyStore.list.filter(({ type }) => type === 'INCOME')}
          type="INCOME"
        />
        <Spacer y={SPACE} />
        <AnnuallyTable
          title={TYPE_AND_LABEL_MAPPINGS['SPEND']}
          rows={annuallyStore.list.filter(({ type }) => type === 'SPEND')}
          type="SPEND"
        />
        <Spacer y={SPACE} />
        <AnnuallySummary data={annuallyStore.list} />
      </PageContainer>
    </>
  );
};
export default MonthlyPage;

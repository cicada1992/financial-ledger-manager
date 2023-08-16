'use client';
import { Spacer } from '@nextui-org/react';
import React, { useEffect, useRef } from 'react';

import { ICreateMonthlyBody, IUpdateMonthlyBody } from '@/app/api/MonthlyAPI/types';
import { useMonthlyStore } from '@/app/store/monthlyStore';
import { useUserStore } from '@/app/store/userStore';
import { DateUtils } from '@/app/utils/dateUtils';

import MonthlyProgress from './MonthlyProgress';
import MonthlySummary from './MonthlySummary';
import MonthlyTable, { IMonthlyTableRef } from './MonthlyTable';
import PageContainer from '../../components/PageContainer';

export const TYPE_AND_LABEL_MAPPINGS: Record<'INCOME' | 'SPEND', string> = {
  INCOME: '수입',
  SPEND: '지출',
};

const SPACE = 6;

const MonthlyPage: React.FC = () => {
  const period = getPeriod();
  const incomeTableRef = useRef<IMonthlyTableRef>(null);
  const spendTableRef = useRef<IMonthlyTableRef>(null);
  const userEmail = useUserStore((state) => state.userInfo.email);
  const monthlyStore = useMonthlyStore();

  useEffect(() => {
    if (!userEmail) return;
    monthlyStore.fetchList(userEmail);
  }, [userEmail]);

  return (
    <PageContainer>
      <MonthlyProgress title={<>진척도 {period}</>} />
      <Spacer y={SPACE} />
      <MonthlyTable
        ref={incomeTableRef}
        title={
          <>
            {TYPE_AND_LABEL_MAPPINGS['INCOME']} {period}
          </>
        }
        rows={monthlyStore.list.filter(({ type }) => type === 'INCOME')}
        type="INCOME"
        createData={createData}
        updateData={updateData}
        removeData={removeData}
      />
      <Spacer y={SPACE} />
      <MonthlyTable
        ref={spendTableRef}
        title={
          <>
            {TYPE_AND_LABEL_MAPPINGS['SPEND']} {period}
          </>
        }
        rows={monthlyStore.list.filter(({ type }) => type === 'SPEND')}
        type="SPEND"
        createData={createData}
        updateData={updateData}
        removeData={removeData}
      />
      <Spacer y={SPACE} />
      <MonthlySummary period={period} data={monthlyStore.list} />
    </PageContainer>
  );

  function createData(body: ICreateMonthlyBody) {
    monthlyStore.create(body, resetSelectedKeys);
  }

  function updateData(body: IUpdateMonthlyBody) {
    monthlyStore.update(body, resetSelectedKeys);
  }

  function removeData(keys: string[]) {
    monthlyStore.remove(keys, resetSelectedKeys);
  }

  function getPeriod() {
    const { startMonth, endMonth } = DateUtils.getKoreanDateInfo();

    return (
      <span style={{ color: '#a1a1aa', fontWeight: 'normal', fontSize: 11 }}>
        ({startMonth}월 25일 ~ {endMonth}월 24일)
      </span>
    );
  }

  function resetSelectedKeys() {
    incomeTableRef?.current?.resetSelectedKeys();
    spendTableRef?.current?.resetSelectedKeys();
  }
};
export default MonthlyPage;

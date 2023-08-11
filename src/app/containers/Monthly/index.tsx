'use client';
import { Spacer } from '@nextui-org/react';
import React, { useEffect, useRef, useState } from 'react';

import MonthlyAPI from '@/app/api/MonthlyAPI';
import { ICreateMonthlyBody, IMonthly, IUpdateMonthlyBody } from '@/app/api/MonthlyAPI/types';
import { useUserInfo } from '@/app/hooks/useAuth';
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
  const [data, setData] = useState<IMonthly[]>([]);
  const incomeTableRef = useRef<IMonthlyTableRef>(null);
  const spendTableRef = useRef<IMonthlyTableRef>(null);
  const userInfo = useUserInfo();

  useEffect(() => {
    fetchData();
  }, []);

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
        rows={data.filter(({ type }) => type === 'INCOME')}
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
        rows={data.filter(({ type }) => type === 'SPEND')}
        type="SPEND"
        createData={createData}
        updateData={updateData}
        removeData={removeData}
      />
      <Spacer y={SPACE} />
      <MonthlySummary period={period} data={data} />
    </PageContainer>
  );

  async function fetchData() {
    if (!userInfo) throw new Error('로그인이 필요합니다.');
    const res = await MonthlyAPI.getData(userInfo.email);
    setData(res);
  }

  async function createData(body: ICreateMonthlyBody) {
    const res = await MonthlyAPI.create(body);
    setData(res);
    resetSelectedKeys();
  }

  async function updateData(body: IUpdateMonthlyBody) {
    const res = await MonthlyAPI.update(body);
    setData(res);
    resetSelectedKeys();
  }

  async function removeData(keys: string[]) {
    const [res] = await Promise.all(keys.map((key) => MonthlyAPI.remove(key)));
    setData(res);
    resetSelectedKeys();
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

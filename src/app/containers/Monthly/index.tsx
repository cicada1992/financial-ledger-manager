'use client';
import { Spacer } from '@nextui-org/react';
import React, { useEffect, useState } from 'react';

import MonthlyAPI from '@/app/api/MonthlyAPI';
import { IGetMonthlyDataResponse } from '@/app/api/MonthlyAPI/types';
import { DateUtils } from '@/app/utils/dateUtils';

import MonthlyProgress from './MonthlyProgress';
import MonthlySummary from './MonthlySummary';
import MonthlyTable from './MonthlyTable';
import PageContainer from '../../components/PageContainer';

const MonthlyPage: React.FC = () => {
  const period = getPeriod();
  const [data, setData] = useState<IGetMonthlyDataResponse>({ spend: [], income: [] });

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <PageContainer>
      <MonthlyProgress title={<>진척도 {period}</>} />
      <Spacer y={4} />
      <MonthlyTable title={<>수입 {period}</>} rows={data.income} />
      <Spacer y={4} />
      <MonthlyTable title={<>지출 {period}</>} rows={data.spend} />
      <Spacer y={4} />
      <MonthlySummary period={period} data={data} />
    </PageContainer>
  );

  function getPeriod() {
    const { startMonth, endMonth } = DateUtils.getKoreanDateInfo();

    return (
      <span style={{ color: '#a1a1aa', fontWeight: 'normal', fontSize: 11 }}>
        ({startMonth}월 25일 ~ {endMonth}월 24일)
      </span>
    );
  }
  async function fetchData() {
    const res = await MonthlyAPI.getData();
    setData(res);
  }
};
export default MonthlyPage;

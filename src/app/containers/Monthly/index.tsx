'use client';
import { Spacer } from '@nextui-org/react';
import React from 'react';
import { useRecoilValue } from 'recoil';

import { Selectors } from '@/app/recoils/selectors';
import { DateUtils } from '@/app/utils/dateUtils';

import MonthlyProgress from './MonthlyProgress';
import MonthlySummary from './MonthlySummary';
import MonthlyTable from './MonthlyTable';
import PageContainer from '../../components/PageContainer';

const MonthlyPage: React.FC = () => {
  const period = getPeriod();
  const data = useRecoilValue(Selectors.monthlyDataQuery);

  return (
    <PageContainer>
      <MonthlyProgress title={<>진척도 {period}</>} />
      <Spacer y={4} />
      <MonthlyTable title={<>수입 {period}</>} rows={data.income} />
      <Spacer y={4} />
      <MonthlyTable title={<>지출 {period}</>} rows={data.spend} />
      <Spacer y={4} />
      <MonthlySummary period={period} />
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
};
export default MonthlyPage;
function useSWR(arg0: string, fetcher: any): { data: any } {
  throw new Error('Function not implemented.');
}

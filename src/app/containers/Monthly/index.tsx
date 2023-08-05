'use client';
import { Spacer } from '@nextui-org/react';
import React from 'react';

import { INCOME_ROWS, SPEND_ROWS } from './constants';
import MonthlySummary from './MonthlySummary';
import MonthlyTable from './MonthlyTable';
import PageContainer from '../../components/PageContainer';

const MonthlyPage: React.FC = () => {
  const period = getPeriod();

  return (
    <PageContainer>
      <MonthlyTable title={<>수입 {period}</>} rows={INCOME_ROWS} />
      <Spacer y={4} />
      <MonthlyTable title={<>지출 {period}</>} rows={SPEND_ROWS} />
      <Spacer y={4} />
      <MonthlySummary period={period} />
    </PageContainer>
  );

  function getPeriod() {
    const now = new Date();
    const utc = now.getTime() + now.getTimezoneOffset() * 60 * 1000;
    // 한국 시간은 UTC보다 9시간 빠름 (9시간의 밀리세컨드 표현)
    const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
    const korNow = new Date(utc + KR_TIME_DIFF);
    const month = korNow.getMonth() + 1;
    const day = korNow.getDay() - 1;
    const isBiggerThan25Day = day > 25;

    return (
      <span style={{ color: '#a1a1aa', fontWeight: 'normal', fontSize: 11 }}>
        ({isBiggerThan25Day ? month - 1 : month}월 25일 ~ {month + 1}월 24일)
      </span>
    );
  }
};
export default MonthlyPage;

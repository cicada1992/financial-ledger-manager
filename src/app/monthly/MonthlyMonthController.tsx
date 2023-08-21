'use client';

import { Button } from '@nextui-org/react';
import dayjs, { Dayjs } from 'dayjs';
import React from 'react';

import { useMonthlyStore } from '../store/monthlyStore';
import { useUserStore } from '../store/userStore';
import { DateUtils } from '../utils/dateUtils';

const MonthlyMonthController: React.FC = () => {
  const referenceDate = useUserStore((state) => state.userInfo.referenceDate);
  const { date, setToPrevMonth, setToNextMonth } = useMonthlyStore();
  const { year, baseMonth } = DateUtils.getYearAndMonth(date, referenceDate);
  const periodNode = getPeriodNode(date);

  return (
    <div
      className="sticky 74-top-px bg-white w-full flex justify-between items-center pb-4"
      style={{ top: 74, zIndex: 1 }}
    >
      <Button isIconOnly size="sm" onClick={setToPrevMonth}>
        {'<'}
      </Button>
      <div className=" flex flex-col justify-between items-center">
        <span style={{ marginBottom: -8 }}>
          {year}년 {baseMonth}월
        </span>
        <span>{periodNode}</span>
      </div>
      <Button isIconOnly size="sm" onClick={setToNextMonth}>
        {'>'}
      </Button>
    </div>
  );

  function getPeriodNode(date: Dayjs) {
    const { baseMonth } = DateUtils.getYearAndMonth(date, referenceDate);
    const start = `${baseMonth}월 ${referenceDate}일`;
    const end =
      Number(referenceDate) === 1
        ? `${baseMonth}월 ${dayjs()
            .set('month', baseMonth - 1)
            .endOf('month')
            .date()}일`
        : `${baseMonth + 1}월 ${referenceDate - 1}일`;
    return (
      <span style={{ color: '#a1a1aa', fontWeight: 'normal', fontSize: 11 }}>
        {start} ~ {end}
      </span>
    );
  }
};

export default MonthlyMonthController;

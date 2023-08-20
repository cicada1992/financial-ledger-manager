'use client';

import { Button } from '@nextui-org/react';
import React from 'react';

import { useMonthlyStore } from '../store/monthlyStore';
import { DateUtils } from '../utils/dateUtils';

const MonthlyMonthController: React.FC = () => {
  const { date, setToPrevMonth, setToNextMonth } = useMonthlyStore();
  const { year, baseMonth } = DateUtils.getYearAndMonth(date);

  return (
    <div
      className="sticky 74-top-px bg-white w-full flex justify-between items-center pb-4"
      style={{ top: 74, zIndex: 1 }}
    >
      <Button isIconOnly size="sm" onClick={setToPrevMonth}>
        {'<'}
      </Button>
      <div>
        {year}년 {baseMonth}월
      </div>
      <Button isIconOnly size="sm" onClick={setToNextMonth}>
        {'>'}
      </Button>
    </div>
  );
};

export default MonthlyMonthController;

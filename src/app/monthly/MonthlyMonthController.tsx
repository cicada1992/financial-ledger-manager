'use client';

import { Button } from '@nextui-org/react';
import React from 'react';

import { useMonthlyStore } from '../store/monthlyStore';

const MonthlyMonthController: React.FC = () => {
  const { baseMonth: startMonth, setToPrevMonth, setToNextMonth } = useMonthlyStore();
  return (
    <div className="w-full flex justify-between">
      <Button isIconOnly size="sm" onClick={setToPrevMonth}>
        {'<'}
      </Button>
      <div>{startMonth}월</div>
      <Button isIconOnly size="sm" onClick={setToNextMonth}>
        {'>'}
      </Button>
    </div>
  );
};

export default MonthlyMonthController;

'use client';

import { Button } from '@nextui-org/react';
import React from 'react';

import { useAnnuallyStore } from '../store/annuallyStore';

const AnnualyYearController: React.FC = () => {
  const { currentYear, setToPrevYear, setToNextYear } = useAnnuallyStore();

  return (
    <div
      className="sticky bg-white w-screen flex justify-between items-center pb-4 px-2 shadow-sm"
      style={{ top: 64, zIndex: 1, marginTop: -10 }}
    >
      <Button isIconOnly size="sm" onClick={setToPrevYear}>
        {'<'}
      </Button>
      <div className=" flex flex-col justify-between items-center">
        <span style={{ marginBottom: -8 }}>{currentYear}년</span>
        <span>
          <span style={{ color: '#a1a1aa', fontWeight: 'normal', fontSize: 11 }}>
            1월 1일 ~ 12월 31일
          </span>
        </span>
      </div>
      <Button isIconOnly size="sm" onClick={setToNextYear}>
        {'>'}
      </Button>
    </div>
  );
};

export default AnnualyYearController;

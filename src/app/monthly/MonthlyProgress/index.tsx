'use client';

import { Popover, PopoverContent, PopoverTrigger, Progress } from '@nextui-org/react';
import React, { useCallback } from 'react';

import { useMonthlyStore } from '@/app/store/monthlyStore';
import { DateUtils } from '@/app/utils/dateUtils';

import { progress } from './MonthlyProgress.css';
import SectionWrapper from '../shared/SectionWrapper';

interface IProps {
  title: React.ReactNode;
}

const MonthlyProgress: React.FC<IProps> = ({ title }) => {
  const baseMonth = useMonthlyStore((state) => state.baseMonth);
  const getValue = useCallback(() => DateUtils.getProgressInfo(baseMonth), [baseMonth]);

  return (
    <SectionWrapper title={title}>
      <Popover placement="bottom-start">
        <PopoverTrigger>
          <Progress value={getValue().ratio} className={`max-w-md ${progress}`} />
        </PopoverTrigger>
        <PopoverContent>
          <div className="px-1 py-2">
            <div className="text-tiny">월급날까지 {getValue().remains}일 남았어요.</div>
          </div>
        </PopoverContent>
      </Popover>
    </SectionWrapper>
  );
};

export default MonthlyProgress;

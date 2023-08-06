'use client';

import { Popover, PopoverContent, PopoverTrigger, Progress } from '@nextui-org/react';
import React, { useCallback } from 'react';

import { DateUtils } from '@/app/utils/dateUtils';

import SectionWrapper from './shared/SectionWrapper';

interface IProps {
  title: React.ReactNode;
}

const MonthlyProgress: React.FC<IProps> = ({ title }) => {
  const getValue = useCallback(() => {
    return DateUtils.getProgressInfo();
  }, []);
  return (
    <SectionWrapper title={title}>
      <Popover placement="bottom-start">
        <PopoverTrigger>
          <Progress value={getValue().ratio} className="max-w-md" />
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

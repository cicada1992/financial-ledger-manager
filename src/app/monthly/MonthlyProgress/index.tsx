'use client';

import { Progress } from '@nextui-org/react';
import React, { useCallback } from 'react';

import { useMonthlyStore } from '@/app/store/monthlyStore';
import { useUserStore } from '@/app/store/userStore';
import { DateUtils } from '@/app/utils/dateUtils';

import { progress } from './MonthlyProgress.css';
import SectionWrapper from '../shared/SectionWrapper';

interface IProps {
  title: React.ReactNode;
}

const MonthlyProgress: React.FC<IProps> = ({ title }) => {
  const referenceDate = useUserStore((state) => state.userInfo.referenceDate);
  const date = useMonthlyStore((state) => state.date);
  const getValue = useCallback(
    () => DateUtils.getProgressInfo(date, referenceDate),
    [date, referenceDate],
  );
  const { ratio, remains } = getValue();

  return (
    <SectionWrapper title={title}>
      <Progress value={ratio} className={progress} />
      <div className="px-1 py-2">
        <div className="text-tiny text-slate-500">
          {remains ? `🚀 월급날까지 ${remains}일 남았어요.` : '🌈 고생많으셨어요 :)'}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default MonthlyProgress;

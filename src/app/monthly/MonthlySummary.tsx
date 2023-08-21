'use client';

import {
  Spacer,
  Card,
  CardBody,
  Popover,
  PopoverTrigger,
  Chip,
  PopoverContent,
} from '@nextui-org/react';
import React from 'react';

import { IMonthly } from '@/app/api/MonthlyAPI/types';

import SectionWrapper from './shared/SectionWrapper';

interface IProps {
  data: IMonthly[];
}

const MonthlySummary: React.FC<IProps> = ({ data }) => {
  return (
    <SectionWrapper title="Summary">
      <Card style={{ width: '100%' }}>
        <CardBody>
          <Popover placement="right">
            <PopoverTrigger>
              <Chip color="primary">{getExpected()}</Chip>
            </PopoverTrigger>
            <PopoverContent>
              <div className="px-1 py-2">
                <div className="text-small font-bold">예상 잔액</div>
                <div className="text-tiny">이번달 총수입에서 총 지출을 뺀 금액이에요.</div>
              </div>
            </PopoverContent>
          </Popover>
          <Spacer y={2} />
          <Popover placement="right">
            <PopoverTrigger>
              <Chip color="default">{getRemainedSpend()}</Chip>
            </PopoverTrigger>
            <PopoverContent>
              <div className="px-1 py-2">
                <div className="text-small font-bold">지출 잔액</div>
                <div className="text-tiny">
                  이번달 지출예정액에서 아직 처리되지 않은 것들의 합산을 의미해요.
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </CardBody>
      </Card>
    </SectionWrapper>
  );

  function getExpected(): string {
    const totalIncome = data
      .filter(({ type }) => type === 'INCOME')
      .reduce((acc, cur) => acc + cur.amount, 0);
    const totalSpend = data
      .filter(({ type }) => type === 'SPEND')
      .reduce((acc, cur) => acc + cur.amount, 0);
    return `￦${(totalIncome - totalSpend).toLocaleString()}`;
  }

  function getRemainedSpend(): string {
    const remained = data
      .filter(({ type }) => type === 'SPEND')
      .reduce((acc, cur) => (cur.done ? acc : acc + cur.amount), 0);
    return `￦${remained.toLocaleString()}`;
  }
};

export default MonthlySummary;

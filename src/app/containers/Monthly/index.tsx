'use client';
import {
  Card,
  CardBody,
  Chip,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Spacer,
} from '@nextui-org/react';
import React from 'react';

import { INCOME_ROWS, SPEND_ROWS } from './constants';
import MonthlyTable from './MonthlyTable';
import PageContainer from '../../components/PageContainer';

const MonthlyPage: React.FC = () => {
  const today = new Date();
  const thisMonth = today.getMonth() + 1;
  return (
    <PageContainer>
      <MonthlyTable rows={INCOME_ROWS} />
      <Spacer y={4} />
      <MonthlyTable rows={SPEND_ROWS} />
      <Spacer y={4} />
      <Card style={{ width: '100%' }}>
        <CardBody>
          <Popover placement="right">
            <PopoverTrigger>
              <Chip color="primary">{getExpected()}</Chip>
            </PopoverTrigger>
            <PopoverContent>
              <div className="px-1 py-2">
                <div className="text-small font-bold">{thisMonth}월 예상 잔액</div>
                <div className="text-tiny">이번달 총수입에서 총 지출을 뺀 금액이에요.</div>
              </div>
            </PopoverContent>
          </Popover>
          <Spacer y={2} />
          <Popover placement="right">
            <PopoverTrigger>
              <Chip color="danger">{getRemainedSpend()}</Chip>
            </PopoverTrigger>
            <PopoverContent>
              <div className="px-1 py-2">
                <div className="text-small font-bold">{thisMonth}월 지출 잔액</div>
                <div className="text-tiny">
                  이번달 지출예정액에서 아직 처리되지 않은 것들의 합산을 의미해요.
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </CardBody>
      </Card>
    </PageContainer>
  );

  function getExpected(): string {
    const totalIncome = INCOME_ROWS.reduce((acc, cur) => acc + cur.price, 0);
    const totalSpend = SPEND_ROWS.reduce((acc, cur) => acc + cur.price, 0);
    return `￦${(totalIncome - totalSpend).toLocaleString()}`;
  }

  function getRemainedSpend(): string {
    const remained = SPEND_ROWS.reduce((acc, cur) => (cur.done ? acc : acc + cur.price), 0);
    return `￦${remained.toLocaleString()}`;
  }
};
export default MonthlyPage;

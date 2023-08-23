'use client';

import { Card, CardBody, Chip, Divider, Spacer } from '@nextui-org/react';
import React from 'react';

import { IMonthly } from '@/app/api/MonthlyAPI/types';

import SectionWrapper from './shared/SectionWrapper';

interface IProps {
  data: IMonthly[];
}

const MonthlySummary: React.FC<IProps> = ({ data }) => {
  const { INCOME: totalIncome, SPEND: totalSpend } = getTotal();
  const { INCOME: remainedIncome, SPEND: remainedSpend } = getRemained();

  return (
    <SectionWrapper title="Summary">
      <Card style={{ width: '100%' }} className="text-sm">
        <CardBody>
          <div className="flex justify-start">
            <div>
              <div className="text-xs pb-1">수입 합계</div>
              <div>
                <Chip color="primary" size="sm">
                  ￦{totalIncome.toLocaleString()}
                </Chip>{' '}
                -
              </div>
            </div>
            <Spacer />
            <div>
              <div className="text-xs pb-1">지출 합계</div>
              <div>
                <Chip color="danger" size="sm">
                  ￦{totalSpend.toLocaleString()}
                </Chip>{' '}
                =
              </div>
            </div>
            <Spacer />
            <div>
              <div className="text-xs pb-1">예상 잔액</div>
              <div>
                <Chip size="sm">￦{(totalIncome - totalSpend).toLocaleString()}</Chip>
              </div>
            </div>
          </div>
          <Divider className="my-4" />
          <div className="flex justify-start">
            <div>
              <div className="text-xs pb-1">지출 잔액</div>
              <div>
                <Chip size="sm">
                  {remainedSpend ? `￦${remainedSpend.toLocaleString()}` : '없음'}
                </Chip>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </SectionWrapper>
  );

  function getTotal() {
    return data.reduce((acc, cur) => ({ ...acc, [cur.type]: acc[cur.type] + cur.amount }), {
      ['INCOME']: 0,
      ['SPEND']: 0,
    });
  }

  function getRemained() {
    return data.reduce(
      (acc, cur) => ({ ...acc, [cur.type]: cur.done ? acc[cur.type] : acc[cur.type] + cur.amount }),
      {
        ['INCOME']: 0,
        ['SPEND']: 0,
      },
    );
  }
};

export default MonthlySummary;

'use client';

import { Input } from '@nextui-org/react';
import React from 'react';

import { IMonthly } from '@/app/api/MonthlyAPI/types';

interface IProps {
  type: IMonthly['type'];
  name: string;
  amount: string;
  date: string;
  onNameChange(value: string): void;
  onAmountChange(value: string): void;
  onDateChange(value: string): void;
}

const AnnuallyRowForm: React.FC<IProps> = ({
  type,
  name,
  amount,
  date,
  onNameChange,
  onAmountChange,
  onDateChange,
}) => {
  return (
    <div key="sm" className="flex w-full flex-col mb-6 md:mb-0 gap-4">
      <Input
        size="sm"
        label="항목"
        placeholder={`항목을 입력하세요. (예: ${type === 'INCOME' ? '월급' : '보험료'})`}
        value={name}
        onChange={handleNameChange}
      />
      <Input
        type="tel"
        size="sm"
        label="금액"
        placeholder={`금액을 입력하세요.`}
        value={amount.replace(/[^\d]/g, '')}
        onChange={handleAmountChange}
      />
      <Input
        type="date"
        size="sm"
        label="날짜"
        value={date}
        placeholder={`날짜를 입력하세요.`}
        onChange={handleDateChange}
      />
    </div>
  );

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    onNameChange(value);
  }

  function handleAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    value.replace(/[^\d]/g, '');
    onAmountChange(value);
  }

  function handleDateChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    onDateChange(value);
  }
};

export default AnnuallyRowForm;

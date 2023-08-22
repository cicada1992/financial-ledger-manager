'use client';

import { ModalBody, ModalHeader } from '@nextui-org/react';
import React from 'react';

import { ICreateMonthlyBody } from '@/app/api/MonthlyAPI/types';
import ButtonWithModal from '@/app/components/ButtonWithModal';
import { useUserStore } from '@/app/store/userStore';
import { YYYYMMDD } from '@/types';

import MonthlyRowForm from './shared/MonthlyForm';
import { TYPE_AND_LABEL_MAPPINGS } from '../page';

interface IProps {
  type: 'INCOME' | 'SPEND';
  onAdd(data: ICreateMonthlyBody): void;
}

const MonthlyRowCreator: React.FC<IProps> = ({ type, onAdd }) => {
  const [name, setName] = React.useState('');
  const [amount, setAmount] = React.useState('');
  const [date, setDate] = React.useState('');
  const userEmail = useUserStore((state) => state.userInfo.email);

  return (
    <ButtonWithModal label="항목 추가" onOk={handleAddClick} onClosed={handleClose}>
      <ModalHeader className="flex flex-col gap-1">{`${TYPE_AND_LABEL_MAPPINGS[type]} 목록에 추가하기`}</ModalHeader>
      <ModalBody>
        <MonthlyRowForm
          type={type}
          name={name}
          amount={amount}
          date={date}
          onNameChange={handleNameChange}
          onAmountChange={handleAmountChange}
          onDateChange={handleDateChange}
        />
      </ModalBody>
    </ButtonWithModal>
  );

  function handleAddClick() {
    if (!amount || !name) throw new Error('항목과 금액을 입력하세요.');
    if (!userEmail) throw new Error('로그인이 필요합니다.');
    const body: ICreateMonthlyBody = {
      name,
      amount: amount ? Number(amount) : 0,
      done: false,
      type,
      date: date as YYYYMMDD,
      userId: userEmail,
    };
    onAdd(body);
  }

  function handleNameChange(value: string) {
    setName(value);
  }

  function handleAmountChange(value: string) {
    value.replace(/[^\d]/g, '');
    setAmount(value);
  }

  function handleDateChange(value: string) {
    setDate(value);
  }

  function handleClose() {
    setName('');
    setAmount('');
    setDate('');
  }
};

export default MonthlyRowCreator;

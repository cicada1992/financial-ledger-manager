'use client';

import { Input, ModalBody, ModalHeader } from '@nextui-org/react';
import React from 'react';

import { ICreateMonthlyBody } from '@/app/api/MonthlyAPI/types';
import ButtonWithModal from '@/app/components/ButtonWithModal';

import { TYPE_AND_LABEL_MAPPINGS } from '..';

interface IProps {
  type: 'INCOME' | 'SPEND';
  onAdd(data: ICreateMonthlyBody): void;
}

const MonthlyRowCreator: React.FC<IProps> = ({ type, onAdd }) => {
  const [name, setName] = React.useState('');
  const [amount, setAmount] = React.useState('');

  return (
    <ButtonWithModal label="항목 추가" onOk={handleAddClick} onClosed={handleClose}>
      <ModalHeader className="flex flex-col gap-1">{`${TYPE_AND_LABEL_MAPPINGS[type]} 목록에 추가하기`}</ModalHeader>
      <ModalBody>
        <div key="sm" className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
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
            value={amount}
            onChange={handleAmountChange}
          />
        </div>
      </ModalBody>
    </ButtonWithModal>
  );

  async function handleAddClick() {
    const body: ICreateMonthlyBody = {
      name,
      amount: amount ? Number(amount) : 0,
      done: false,
      type,
    };
    onAdd(body);
  }

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    setName(value);
  }

  function handleAmountChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    value.replace(/[^0-9]/g, '');
    setAmount(value);
  }

  async function handleClose() {
    setName('');
    setAmount('');
  }
};

export default MonthlyRowCreator;
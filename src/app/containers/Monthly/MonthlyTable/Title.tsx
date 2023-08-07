'use client';

import { Input, ModalBody, ModalHeader } from '@nextui-org/react';
import React from 'react';

import { ICreateMonthlyBody } from '@/app/api/MonthlyAPI/types';
import ButtonWithModal from '@/app/components/ButtonWithModal';

import { TYPE_AND_LABEL_MAPPINGS } from '..';

interface IProps {
  title: React.ReactNode;
  type: 'INCOME' | 'SPEND';
  onAdd(data: ICreateMonthlyBody): void;
}

const MonthlyTableTitle: React.FC<IProps> = ({ title, type, onAdd }) => {
  const [name, setName] = React.useState('');
  const [amount, setAmount] = React.useState('');

  return (
    <div className="flex justify-between items-end">
      <div>{title}</div>
      <ButtonWithModal label="추가" onOk={handleAddClick}>
        <ModalHeader className="flex flex-col gap-1">{`${TYPE_AND_LABEL_MAPPINGS[type]} 목록에 추가하기`}</ModalHeader>
        <ModalBody>
          <div key="sm" className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
            <Input
              size="sm"
              label="항목"
              placeholder={`항목을 입력하세요. (예: ${type === 'INCOME' ? '월급' : '보험료'})`}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              type="number"
              size="sm"
              label="금액"
              placeholder={`금액을 입력하세요.`}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
        </ModalBody>
      </ButtonWithModal>
    </div>
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
};

export default MonthlyTableTitle;

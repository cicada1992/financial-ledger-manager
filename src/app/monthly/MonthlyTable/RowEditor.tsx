'use client';

import { ModalBody, ModalHeader } from '@nextui-org/react';
import React, { useEffect } from 'react';

import { IMonthly, IUpdateMonthlyBody } from '@/app/api/MonthlyAPI/types';
import ButtonWithModal from '@/app/components/ButtonWithModal';
import { useUserStore } from '@/app/store/userStore';
import { YYYYMMDD } from '@/types';

import MonthlyRowForm from './shared/MonthlyForm';
import { TYPE_AND_LABEL_MAPPINGS } from '../page';

interface IProps {
  row?: IMonthly;
  type: IMonthly['type'];
  className?: string;
  onEdit(row: IMonthly): void;
}

const MonthlyRowEditor: React.FC<IProps> = ({ row, type, className, onEdit }) => {
  const [name, setName] = React.useState('');
  const [amount, setAmount] = React.useState('');
  const [date, setDate] = React.useState<string>('');
  const userEmail = useUserStore((state) => state.userInfo.email);

  useEffect(() => {
    setFieldsByRow();
  }, [row]);

  return (
    <ButtonWithModal
      label="수정"
      buttonProps={{ color: 'warning' }}
      className={className}
      onOk={handleEditClick}
      onClosed={handleClose}
    >
      <ModalHeader className="flex flex-col gap-1">{`${TYPE_AND_LABEL_MAPPINGS[type]} 목록에서 수정하기`}</ModalHeader>
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

  function handleEditClick() {
    if (!row) throw new Error('해당하는 데이터가 없습니다.');
    if (!amount || !name) throw new Error('항목과 금액을 입력하세요.');
    if (!userEmail) throw new Error('로그인이 필요합니다.');
    const body: IUpdateMonthlyBody = {
      id: row.id,
      name,
      amount: amount ? Number(amount) : 0,
      done: false,
      type,
      date: date as YYYYMMDD,
      userId: userEmail,
    };
    onEdit(body);
  }

  function handleClose() {
    setFieldsByRow();
  }

  function setFieldsByRow() {
    if (!row) return;
    setName(row.name);
    setAmount(String(row.amount));
    setDate(row.date);
  }
};

export default MonthlyRowEditor;

'use client';

import { ModalBody, ModalHeader } from '@nextui-org/react';
import React from 'react';

import ButtonWithModal from '@/app/components/ButtonWithModal';

import { TYPE_AND_LABEL_MAPPINGS } from '..';

interface IProps {
  type: 'INCOME' | 'SPEND';
  className?: string;
  onRemove(): void;
}

const MonthlyRowRemover: React.FC<IProps> = ({ type, className, onRemove }) => {
  return (
    <ButtonWithModal
      label="선택된 항목 삭제"
      onOk={handleRemoveClick}
      buttonProps={{ color: 'danger' }}
      className={className}
    >
      <ModalHeader className="flex flex-col gap-1">{`${TYPE_AND_LABEL_MAPPINGS[type]} 목록에서 삭제하기`}</ModalHeader>
      <ModalBody>정말로 삭제하시겠어요?</ModalBody>
    </ButtonWithModal>
  );

  async function handleRemoveClick() {
    onRemove();
  }
};

export default MonthlyRowRemover;

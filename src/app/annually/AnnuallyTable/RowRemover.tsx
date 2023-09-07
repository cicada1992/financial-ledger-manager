'use client';

import { ModalBody, ModalHeader } from '@nextui-org/react';
import React from 'react';

import { IAnnually } from '@/app/api/AnnuallyAPI/types';
import ButtonWithModal from '@/app/components/ButtonWithModal';

import { TYPE_AND_LABEL_MAPPINGS } from '../page';

interface IProps {
  type: IAnnually['type'];
  className?: string;
  onRemove(): void;
}

const AnnuallyRowRemover: React.FC<IProps> = ({ type, className, onRemove }) => {
  return (
    <ButtonWithModal
      label="삭제"
      onOk={onRemove}
      buttonProps={{ color: 'danger' }}
      className={className}
    >
      <ModalHeader className="flex flex-col gap-1">{`${TYPE_AND_LABEL_MAPPINGS[type]} 목록에서 삭제하기`}</ModalHeader>
      <ModalBody>정말로 삭제하시겠어요?</ModalBody>
    </ButtonWithModal>
  );
};

export default AnnuallyRowRemover;

'use client';

import { ModalBody, ModalHeader } from '@nextui-org/react';
import React from 'react';

import ButtonWithModal from '@/app/components/ButtonWithModal';
import { useAnnuallyStore } from '@/app/store/annuallyStore';
import { useUserStore } from '@/app/store/userStore';

const CopyPrevYearDataButton: React.FC = () => {
  const userEmail = useUserStore((state) => state.userInfo.email);
  const annuallyStore = useAnnuallyStore();

  return (
    <ButtonWithModal
      buttonProps={{ color: 'primary', size: 'sm' }}
      label="전년도 데이터 불러오기"
      onOk={handleOkClick}
    >
      <ModalHeader className="flex flex-col gap-1">전년도 데이터 불러오기</ModalHeader>
      <ModalBody>정말 불러오시겠어요?</ModalBody>
    </ButtonWithModal>
  );

  function handleOkClick() {
    const prevYear = annuallyStore.currentYear - 1;
    annuallyStore.copyData(userEmail, prevYear);
  }
};

export default CopyPrevYearDataButton;

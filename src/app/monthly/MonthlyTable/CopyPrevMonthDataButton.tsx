'use client';

import { ModalBody, ModalHeader } from '@nextui-org/react';
import React from 'react';

import ButtonWithModal from '@/app/components/ButtonWithModal';
import { useMonthlyStore } from '@/app/store/monthlyStore';
import { useUserStore } from '@/app/store/userStore';
import { DateUtils } from '@/app/utils/dateUtils';

const CopyPrevMonthDataButton: React.FC = () => {
  const userEmail = useUserStore((state) => state.userInfo.email);
  const referenceDate = useUserStore((state) => state.userInfo.referenceDate);
  const monthlyStore = useMonthlyStore();
  const { baseMonth } = DateUtils.getYearAndMonth(monthlyStore.date, referenceDate);

  return (
    <ButtonWithModal
      buttonProps={{ color: 'primary', size: 'sm' }}
      label="전월 데이터 불러오기"
      onOk={handleOkClick}
    >
      <ModalHeader className="flex flex-col gap-1">전월 데이터 불러오기</ModalHeader>
      <ModalBody>정말 불러오시겠어요?</ModalBody>
    </ButtonWithModal>
  );

  function handleOkClick() {
    monthlyStore.copyData(userEmail, monthlyStore.date.subtract(1, 'month'));
  }
};

export default CopyPrevMonthDataButton;

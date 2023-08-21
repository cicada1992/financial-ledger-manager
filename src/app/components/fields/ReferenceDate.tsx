'use client';

import { Input } from '@nextui-org/react';
import React from 'react';

interface IProps {
  value: string | number;
  onChange(value: string): void;
}

const ReferenceDateField: React.FC<IProps> = ({ value, onChange }) => {
  return (
    <Input
      type="tel"
      size="sm"
      label="기준일"
      placeholder={`기준일을 입력하세요.`}
      value={String(value).replace(/[^\d]/g, '')}
      onChange={handleChange}
      maxLength={2}
      min={1}
      max={31}
    />
  );

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    onChange(value);
  }
};
export default ReferenceDateField;

'use client';

import { Input } from '@nextui-org/react';
import React from 'react';

interface IProps {
  value: string;
  onChange(value: string): void;
}

const EmailField: React.FC<IProps> = ({ value, onChange }) => {
  return <Input size="sm" label="이메일" value={value} onChange={handleEmailChange} />;

  function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    onChange(value);
  }
};

export default EmailField;

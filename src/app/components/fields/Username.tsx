'use client';

import { Input } from '@nextui-org/react';
import React from 'react';

interface IProps {
  value: string;
  onChange(value: string): void;
}

const UsernameField: React.FC<IProps> = ({ value, onChange }) => {
  return <Input size="sm" label="이름" value={value} onChange={handleUsernameChange} />;

  function handleUsernameChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    onChange(value);
  }
};
export default UsernameField;

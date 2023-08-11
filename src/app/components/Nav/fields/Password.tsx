'use client';

import { Input } from '@nextui-org/react';
import React from 'react';

interface IProps {
  value: string;
  onChange(value: string): void;
}

const PasswordField: React.FC<IProps> = ({ value, onChange }) => {
  return (
    <Input
      type="password"
      size="sm"
      label="패스워드"
      value={value}
      onChange={handlePasswordChange}
    />
  );

  function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    onChange(value);
  }
};
export default PasswordField;

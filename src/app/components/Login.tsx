'use client';

import { Button, Spacer } from '@nextui-org/react';
import React from 'react';

import AuthAPI from '@/app/api/AuthAPI';
import ErrorManager from '@/app/lib/ErrorManager';

import EmailField from './Nav/fields/Email';
import PasswordField from './Nav/fields/Password';

const LoginButton: React.FC = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <div className="flex flex-col w-full max-w-xs justify-center mt-60">
      <EmailField value={email} onChange={setEmail} />
      <Spacer y={2} />
      <PasswordField value={password} onChange={setPassword} />
      <Spacer y={4} />
      <Button className="w-full" color="primary" variant="flat" onClick={handleSubmit}>
        Login
      </Button>
    </div>
  );

  async function handleSubmit() {
    try {
      await AuthAPI.login({ email, password });
    } catch (e) {
      ErrorManager.alert(e);
    }
  }

  function resetFields() {
    setEmail('');
    setPassword('');
  }
};

export default LoginButton;

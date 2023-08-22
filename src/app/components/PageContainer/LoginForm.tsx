'use client';

import { Button, Spacer } from '@nextui-org/react';
import Image from 'next/image';
import React from 'react';

import AuthAPI from '@/app/api/AuthAPI';
import ErrorManager from '@/app/lib/ErrorManager';

import logo from '../../assets/logo.png';
import EmailField from '../fields/Email';
import PasswordField from '../fields/Password';

const LoginForm: React.FC = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <div className="flex flex-col w-full max-w-xs justify-center items-center mt-40">
      <Image src={logo} alt="Vercel Logo" priority />
      <Spacer y={2} />
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
      resetFields();
    } catch (e) {
      ErrorManager.alert(e);
    }
  }

  function resetFields() {
    setEmail('');
    setPassword('');
  }
};

export default LoginForm;

'use client';

import { ModalBody, ModalHeader } from '@nextui-org/react';
import React from 'react';

import AuthAPI from '@/app/api/AuthAPI';
import ErrorManager from '@/app/lib/ErrorManager';

import EmailField from './fields/Email';
import PasswordField from './fields/Password';
import UsernameField from './fields/Username';
import ButtonWithModal from '../ButtonWithModal';

const SignUpButton: React.FC = () => {
  const [email, setEmail] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <ButtonWithModal
      label="Sign Up"
      buttonProps={{ color: 'primary', variant: 'flat', size: 'md' }}
      onOk={handleSubmit}
      onClosed={resetFields}
    >
      <ModalHeader className="flex flex-col gap-1">회원가입</ModalHeader>
      <ModalBody>
        <div key="sm" className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">
          <EmailField value={email} onChange={setEmail} />
          <UsernameField value={username} onChange={setUsername} />
          <PasswordField value={password} onChange={setPassword} />
        </div>
      </ModalBody>
    </ButtonWithModal>
  );

  async function handleSubmit() {
    try {
      await AuthAPI.signUp({ email, username, password });
    } catch (e) {
      ErrorManager.alert(e);
    }
  }

  function resetFields() {
    setEmail('');
    setUsername('');
    setPassword('');
  }
};

export default SignUpButton;

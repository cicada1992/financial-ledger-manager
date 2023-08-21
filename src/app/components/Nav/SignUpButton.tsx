'use client';

import { ModalBody, ModalHeader } from '@nextui-org/react';
import React from 'react';

import { IUserPayload } from '@/app/api/AuthAPI/types';
import { useUserStore } from '@/app/store/userStore';

import ButtonWithModal from '../ButtonWithModal';
import EmailField from '../fields/Email';
import PasswordField from '../fields/Password';
import ReferenceDateField from '../fields/ReferenceDate';
import UsernameField from '../fields/Username';

const SignUpButton: React.FC = () => {
  const [email, setEmail] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [referenceDate, setReferenceDate] = React.useState('');
  const userStore = useUserStore();

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
          <ReferenceDateField value={referenceDate} onChange={setReferenceDate} />
        </div>
      </ModalBody>
    </ButtonWithModal>
  );

  async function handleSubmit() {
    const body: IUserPayload = {
      email,
      username,
      password,
      referenceDate: Number(referenceDate),
    };
    await userStore.register(body);
  }

  function resetFields() {
    setEmail('');
    setUsername('');
    setPassword('');
  }
};

export default SignUpButton;

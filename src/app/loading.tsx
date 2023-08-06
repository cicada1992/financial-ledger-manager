'use client';
import { CircularProgress } from '@nextui-org/react';
import React from 'react';

interface IProps {}

const Loading: React.FC<IProps> = () => {
  return <CircularProgress />;
};

export default Loading;

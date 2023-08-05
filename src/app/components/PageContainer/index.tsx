'use client';

import React from 'react';

import { main } from './pageContainer.css';

interface IProps {
  children: React.ReactNode;
}

const PageContainer: React.FC<IProps> = ({ children }) => {
  return <main className={main}>{children}</main>;
};

export default PageContainer;

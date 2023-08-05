'use client';
import React from 'react';

interface IProps {
  error: Error;
}

const Error: React.FC<IProps> = ({ error }) => {
  return <div>{error.message}</div>;
};

export default Error;

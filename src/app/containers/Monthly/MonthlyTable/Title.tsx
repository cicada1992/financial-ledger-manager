'use client';

import React from 'react';

interface IProps {
  title: React.ReactNode;
}

const MonthlyTableTitle: React.FC<IProps> = ({ title }) => {
  return (
    <div className="flex justify-between items-end">
      <div>{title}</div>
    </div>
  );
};

export default MonthlyTableTitle;

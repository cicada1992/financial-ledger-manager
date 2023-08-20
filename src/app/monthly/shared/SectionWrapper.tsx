'use client';

import React from 'react';

interface IProps {
  title: React.ReactNode;
  children: React.ReactNode;
}

const SectionWrapper: React.FC<IProps> = ({ title, children }) => {
  return (
    <div style={{ width: '100%' }}>
      <div style={{ paddingLeft: 8, paddingBottom: 8, fontWeight: 'bold', fontSize: 14 }}>
        {title}
      </div>
      {children}
    </div>
  );
};

export default SectionWrapper;

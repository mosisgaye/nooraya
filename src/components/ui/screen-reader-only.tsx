'use client';

import React from 'react';

interface ScreenReaderOnlyProps {
  children: React.ReactNode;
  as?: keyof React.JSX.IntrinsicElements;
}

const ScreenReaderOnly: React.FC<ScreenReaderOnlyProps> = ({ children, as: Component = 'span' }) => {
  return (
    <Component
      className="sr-only"
      style={{
        position: 'absolute',
        width: '1px',
        height: '1px',
        padding: '0',
        margin: '-1px',
        overflow: 'hidden',
        clip: 'rect(0, 0, 0, 0)',
        whiteSpace: 'nowrap',
        border: '0'
      }}
    >
      {children}
    </Component>
  );
};

export default ScreenReaderOnly;
import React, { ReactNode } from 'react';

export interface OnetLinkProps {
  socCode: string;
  children: ReactNode;
}

const OnetLink = ({ socCode, children }: OnetLinkProps) => {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      href={`https://www.mynextmove.org/profile/summary/${socCode}${
        socCode.endsWith('.00') ? '' : '.00'
      }`}
    >
      {children}
    </a>
  );
};

export default OnetLink;

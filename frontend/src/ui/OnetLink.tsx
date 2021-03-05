import React, { ReactNode } from 'react';

export interface OnetLinkProps {
  socCode: string;
  children: ReactNode;
}

const OnetLink = ({ socCode, occupation, children }: OnetLinkProps) => {
  if (occupation.endsWith('All Other')) {
    return <>{children}</>;
  } else {
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
  }
};

export default OnetLink;

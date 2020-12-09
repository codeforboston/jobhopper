import React from 'react';

export interface OnetLinkProps {
  socCode: string;
}

const OnetLink = (props: OnetLinkProps) => {
  return (
    <a href={`https://www.mynextmove.org/profile/summary/${props.socCode}`}>
      {props.socCode}
    </a>
  );
};

export default OnetLink;

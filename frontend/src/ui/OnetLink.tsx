import React from 'react';

export interface OnetLinkProps {
  socCode: string;
}

const OnetLink = (props: OnetLinkProps) => (
  <React.Fragment>
    <a href={`https://www.mynextmove.org/profile/summary/${props.socCode}`}>
      {props.socCode}
    </a>
  </React.Fragment>
);

export default OnetLink;

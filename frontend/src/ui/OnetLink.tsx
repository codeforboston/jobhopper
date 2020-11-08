import React from 'react';

export interface OnetLinkProps {
  socCode: string;
}

const OnetLink = (props: OnetLinkProps) => {
  let newcode = props.socCode;
  if (!newcode.endsWith('.00')) {
    newcode = `${newcode}.00`;
  }
  return (
    <React.Fragment>
      <a href={`https://www.mynextmove.org/profile/summary/${newcode}`}>
        {newcode}
      </a>
    </React.Fragment>
  );
};

export default OnetLink;

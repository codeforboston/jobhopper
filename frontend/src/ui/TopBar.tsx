import { Link } from '@material-ui/core';
import React from 'react';
import { PageContainer, Row, Section } from './Common';
import { ShadowButton } from './Button';
import Logo from './Logo';
import { Body, Title } from './Typography';

const TopBar = () => {
  return (
    <Row
      style={{
        alignItems: 'flex-start',
        justifyContent: 'space-between',
      }}
    >
      <Logo style={{ margin: '25 0 0 50' }} />
      <Row
        style={{
          flexDirection: 'row',
          flexWrap: 'nowrap',
          width: '220px',
          height: '60px',
          justifyContent: 'space-between',
        }}
      >
        <ShadowButton label={'About'} />
        <ShadowButton label={'Contact'} />
      </Row>
    </Row>
  );
};
export default TopBar;

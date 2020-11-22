import React from 'react';
import { Row } from './Common';
import Logo from './Logo';
import { Link } from 'react-router-dom';

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
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </Row>
    </Row>
  );
};
export default TopBar;

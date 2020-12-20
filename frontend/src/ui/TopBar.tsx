import React from 'react';
import { Row } from './Common';
import Logo from './Logo';
import { Link } from 'react-router-dom';
import { ShadowButton } from './Button';
import styled from 'styled-components';

const NakedLink = styled(Link)`
    text-decoration: none;
  `,
  NavLink = ({ to, label }: { to: string; label: string }) => (
    <NakedLink to={to}>
      <ShadowButton label={label} />
    </NakedLink>
  );

const TopBar = () => {
  return (
    <Row
      style={{
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Link to="/">
        <Logo style={{ margin: '25 0 0 50' }} />
      </Link>
      <Row
        style={{
          flexDirection: 'row',
          flexWrap: 'nowrap',
          width: '220px',
          height: '60px',
          justifyContent: 'space-between',
        }}
      >
        <NavLink label="About" to="/about" />
        <NavLink label="Contact" to="/contact" />
      </Row>
    </Row>
  );
};

export default TopBar;

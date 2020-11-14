import { Link } from '@material-ui/core';
import React from 'react';
import { PageContainer, Row, Section } from './Common';
import Logo from './Logo';
import { Body, Title } from './Typography';
import TopBar from './TopBar';

const ContactPage = () => {
  return (
    <PageContainer>
      <TopBar />
      <Section
        style={{
          width: '600px',
          margin: 'auto',
          marginTop: '100px',
        }}
      >
        <Title>For more information contact:</Title>
        <Body>
          <Link href="#">
            <p>Designated contact link here </p>
          </Link>
          <Link href="#">
            <p>Perhaps other links to other databases</p>
          </Link>
        </Body>
      </Section>
    </PageContainer>
  );
};

export default ContactPage;

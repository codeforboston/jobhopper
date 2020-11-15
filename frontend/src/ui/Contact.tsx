import { Link } from '@material-ui/core';
import React from 'react';
import { Body, Title } from './Typography';
import Page from './Page';

const ContactPage = () => {
  return (
    <Page>
      <Title>For more information contact:</Title>
      <Body>
        <Link href="#">
          <p>Designated contact link here </p>
        </Link>
        <Link href="#">
          <p>Perhaps other links to other databases</p>
        </Link>
      </Body>
    </Page>
  );
};

export default ContactPage;

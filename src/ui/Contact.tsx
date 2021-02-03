import { Link } from '@material-ui/core';
import React from 'react';
import { Body, Title } from './Typography';
import Page from './Page';

const ContactPage = () => {
  return (
    <Page>
      <Title>For more information contact:</Title>
      <Body>
        <Link href="https://github.com/codeforboston/jobhopper">
          <p>The JobHopper Project</p>
        </Link>
      </Body>
    </Page>
  );
};

export default ContactPage;

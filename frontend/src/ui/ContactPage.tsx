import React from 'react';
import { Body, Title } from './Typography';

const ContactPage = () => (
  <div>
    <Title>Contact Us</Title>
    <Body>
      For more information:
      <br />
      <br />
      <a href="https://github.com/codeforboston/jobhopper/issues">
        contact us by logging an issue
      </a>
      &nbsp; or
      <br />
      <br />
      <a href="https://github.com/codeforboston/jobhopper/blob/develop/References/References.md">
        Learn more about the data
      </a>
      <br />
    </Body>
  </div>
);

export default ContactPage;

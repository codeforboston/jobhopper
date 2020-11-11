import React from 'react';
import { Body, Title } from './Typography';

const AboutPage = () => (
  <div>
    <Title>About Page</Title>
    <Body>
      Job Hopper is a project of{' '}
      <a href="https://www.codeforboston.org">Code For Boston</a>. It is an open
      source application built by volunteers. This application was built in
      collaboration with the City of Somerville. It is based on the work of
      <a href="https://sites/google.com/view/gregorschubert">
        Gregor Schubert
      </a>{' '}
      and <a href="https://scholar.harvard.edu/stansbury">Anna Stansbury</a>.
    </Body>
  </div>
);

export default AboutPage;

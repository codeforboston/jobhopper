import { Link } from '@material-ui/core';
import React from 'react';
import { Body, Title } from './Typography';
import Page from './Page';

export interface LandingPageProps {
  title: string;
  body: string;
}

const AboutPage = () => {
  return (
    <Page>
      <Title>About JobHopper</Title>
      <Body>
        Job Hopper is a project of{' '}
        <a href="https://www.codeforboston.org">Code for Boston</a>. It is an
        open source application built by volunteers. This application was built
        in collaboration with the City of Somerville. It is based on the work of{' '}
        <a href="https://sites.google.com/view/gregorschubert">
          Gregor Schubert
        </a>{' '}
        and <a href="https://scholar.harvard.edu/stansbury">Anna Stansbury</a>
      </Body>
    </Page>
  );
};

export default AboutPage;

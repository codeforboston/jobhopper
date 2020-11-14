import { Link } from '@material-ui/core';
import React from 'react';
import { PageContainer, Row, Section } from './Common';
import { ShadowButton } from './Button';
import Logo from './Logo';
import { Body, Title } from './Typography';
import TopBar from './TopBar';

export interface LandingPageProps {
  title: string;
  body: string;
}

const AboutPage = () => {
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
        <Title>About JobHopper</Title>
        <Body>
          {' '}
          Job Hopper is a project of Code for Boston{' '}
          <Link href="https://www.codeforboston.org">
            https://www.codeforboston.org
          </Link>{' '}
          It is an open source application built by volunteers. This application
          was built in collaboration with the City of Somerville. It is based on
          the work of Gregor Schubert{' '}
          <Link href="https://sites.google.com/view/gregorschubert">
            https://sites.google.com/view/gregorschubert
          </Link>{' '}
          and Anna Stansbury{' '}
          <Link href="https://scholar.harvard.edu/stansbury">
            https://scholar.harvard.edu/stansbury
          </Link>
        </Body>
      </Section>
    </PageContainer>
  );
};

export default AboutPage;

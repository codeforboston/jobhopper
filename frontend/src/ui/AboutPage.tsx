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
        in collaboration with the City of Somerville. The application visualizes
        a new data set of U.S. occupational mobility constructed using data from
        16 million US workers’ resumes, collected and parsed by{' '}
        <a href="https://www.burning-glass.com">Burning Glass Technologies</a>,
        an analytics software company focused on the labor market. Thanks very
        much to Burning Glass Technologies for allowing us to make this data
        available to the general public. The occupational transitions data was
        initially constructed by{' '}
        <a href="https://sites.google.com/view/gregorschubert">
          {' '}
          Gregor Schubert
        </a>
        , <a href="https://scholar.harvard.edu/stansbury">Anna Stansbury</a> ,
        and{' '}
        <a href="https://scholar.google.com/citations?user=s7UfVc0AAAAJ&hl=en">
          Bledi Taska
        </a>
        , for their academic paper “Employer Concentration and Outside Options”.
        The paper, the full data set, and the README explanatory file for the
        data set, can be downloaded at:{' '}
        <a href="https://scholar.harvard.edu/stansbury/concentration-options">
          scholar.harvard.edu/stansbury/concentration-options
        </a>
        .
      </Body>
    </Page>
  );
};

export default AboutPage;

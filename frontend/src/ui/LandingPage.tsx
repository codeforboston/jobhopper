import { Link } from '@material-ui/core';
import React from 'react';
import { Body, Title } from './Typography';
import Page from './Page';

const LandingPage = () => {
  return (
    <Page>
      <Title>Occupation Transitions</Title>
      <Body>
        JobHopper is a tool to explore data on mobility between occupations,
        calculated from around 16 million resumes of U.S. workers, obtained and
        parsed by Burning Glass Technologies. The tool is designed to help
        program managers, policy analysts and job coaches explore occupational
        transitions that job changers have made. Understanding these transitions
        can support program and policy development as well as individual job
        seekers aspirations.
      </Body>
      <Link>Begin Here</Link>
    </Page>
  );
};

export default LandingPage;

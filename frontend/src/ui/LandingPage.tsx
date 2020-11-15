import { Link } from '@material-ui/core';
import React from 'react';
import { PageContainer, Section } from './Common';
import { Body, Title } from './Typography';
import TopBar from './TopBar';

const LandingPage = () => {
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
        <Title>Occupation Transitions</Title>
        <Body>
          JobHopper is a tool to explore data on mobility between occupations,
          calculated from around 16 million resumes of U.S. workers, obtained
          and parsed by Burning Glass Technologies. The tool is designed to help
          program managers, policy analysts and job coaches explore occupational
          transitions that job changers have made. Understanding these
          transitions can support program and policy development as well as
          individual job seekers aspirations.
        </Body>
        <Link>Begin Here</Link>
      </Section>
    </PageContainer>
  );
};

export default LandingPage;

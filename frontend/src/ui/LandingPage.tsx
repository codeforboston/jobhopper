import { Link } from '@material-ui/core';
import React from 'react';
import { PageContainer, Row, Section, ShadowButton } from './Common';
import Logo from './Logo';
import { Body, Title } from './Typography';

export interface LandingPageProps {
  title: string;
  body: string;
}

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
        <Title>JobHopper, A Code For Boston Project</Title>
        <Body>
          Code for Boston addresses local social and civic challenges through
          creative uses of technology. Despite the name, we're not solely
          focused on coding! We foster relationships between government,
          nonprofit, academic, for-profit companies, residents, civic
          technologists, analysts, designers, and many more.
        </Body>
        <Link>All are welcome!</Link>
      </Section>
    </PageContainer>
  );
};

const TopBar = () => {
  return (
    <Row
      style={{
        alignItems: 'flex-start',
        justifyContent: 'space-between',
      }}
    >
      <Logo style={{ margin: '25 0 0 50' }} />
      <Row
        style={{
          flexDirection: 'row',
          flexWrap: 'nowrap',
          width: '220px',
          height: '60px',
          justifyContent: 'space-between',
        }}
      >
        <ShadowButton text={'About'} />
        <ShadowButton text={'Contact'} />
      </Row>
    </Row>
  );
};

export default LandingPage;

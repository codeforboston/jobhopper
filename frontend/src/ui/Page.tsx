import React from 'react';
import styled from 'styled-components';
import TopBar from './TopBar';

const PageContainer = styled.div`
  max-width: 800px;
  margin: auto;
  padding-bottom: 1em;
  padding-right: 1em;
  padding-left: 1em;
`;

const Page: React.FC = ({ children }) => (
  <PageContainer>
    <TopBar />
    <div
      style={{
        maxWidth: '600px',
        margin: 'auto',
      }}
    >
      {children}
    </div>
  </PageContainer>
);

export default Page;

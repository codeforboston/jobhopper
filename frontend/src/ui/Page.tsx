import React from 'react';
import styled from 'styled-components';
import TopBar from './TopBar';

const PageContainer = styled.div`
  max-width: 800px;
  margin: auto;
`;

const Page: React.FC = ({ children }) => (
  <PageContainer>
    <TopBar />
    <div
      style={{
        width: '600px',
        margin: 'auto',
        marginTop: '100px',
      }}
    >
      {children}
    </div>
  </PageContainer>
);

export default Page;

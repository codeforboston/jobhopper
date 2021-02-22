import React from 'react';
import styled from 'styled-components';

const Message = styled.div`
  font-weight: bold;
`;

const EmptyResults = () => (
  <Message>
    We do not have data on occupational transitions for this occupation{' '}
  </Message>
);

export default EmptyResults;

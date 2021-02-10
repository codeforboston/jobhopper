import React from 'react';
import styled from 'styled-components';

const Error = styled.div`
  color: red;
  font-weight: bold;
`;

const ResultError = ({ error }: { error: string }) => (
  <Error>Error loading results: {error}</Error>
);

export default ResultError;

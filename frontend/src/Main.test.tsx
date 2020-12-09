import React from 'react';
import { render } from '@testing-library/react';
import Main from './Main';

test('renders learn react link', () => {
  const { getByText } = render(<Main />);
  const instructions = getByText(/Occupation Transitions/i);
  expect(instructions).toBeInTheDocument();
});

test('renders percentage as expected', () => {
  const n = 34.3943;
  expect(n).toBeDefined();
});

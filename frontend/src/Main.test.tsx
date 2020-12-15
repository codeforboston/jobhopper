import React from 'react';
import { render, wait } from '@testing-library/react';
import Main from './Main';
import { fireEvent, getQueriesForElement } from '@testing-library/dom';
import { Input, Select } from '@material-ui/core';
import userEvent from '@testing-library/user-event';

// renders the Main component, fills out the transition form, and renders the results table using the FakeApi. This tests interactions with the form and the container logic.

const mockSelectTransition = '../../api';

const { getByText, getByLabelText, getAllByTestId, findByText } = render(
  <Main />
);

const occupationInput = getByLabelText('Select occupation...');
const stateInput = getByLabelText('Select state...');

test('renders learn react link', () => {
  const { getByText } = render(<Main />);
  const instructions = getByText(/enter occupation/i);
  expect(instructions).toBeInTheDocument();
});

test('renders correct content from transitions page', async () => {
  const { getByLabelText } = render(<Main />);

  const occupationInput = getByLabelText('Select occupation...');
  const stateInput = getByLabelText('Select state...');

  expect(occupationInput).not.toBeNull();
  expect(stateInput).not.toBeNull();
});

test('allows user to select occupation and state from select menus', async () => {
  const { getByLabelText } = render(<Main />);

  userEvent.selectOptions(occupationInput, '01-2345 | Doctor');
  userEvent.selectOptions(stateInput, 'California');

  // fireEvent.change(occupationInput, {target: {value: 1}});
  // fireEvent.change(stateInput, { target: {value: 1} });

  getByLabelText('See a Matrix').click(); //render table

  await wait(() => expect(findByText('Job Transitions')).not.toBeEmpty()); //check table renders content correctly

  getByLabelText('See a Treechart').click();
  await wait(() => expect(findByText('Job Transitions')).not.toBeEmpty());
});

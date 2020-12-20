import React from 'react';
// import { render, wait } from '@testing-library/react';
import Main from './Main';
import { fireEvent, getQueriesForElement } from '@testing-library/dom';
import { Input /*Select*/ } from '@material-ui/core';
import userEvent from '@testing-library/user-event';

import Select from 'react-select';
import { render, wait } from '@testing-library/react';
import selectEvent from 'react-select-event';

// renders the Main component, fills out the transition form, and renders the results table using the FakeApi. This tests interactions with the form and the container logic.

const mockSelectTransition = '../../api';

const {
  getByText,
  getByLabelText,
  getAllByTestId,
  findByText,
  getByPlaceholderText,
  getByDisplayValue,
  getByTestId,
} = render(<Main />);

// const occupationInput = getByTestId('occupation-select');
// const stateInput = getByLabelText('Select state...');

// test('renders learn react link', () => {
//   const { getByText } = render(<Main />);
//   const instructions = getByText(/enter occupation/i);
//   expect(instructions).toBeInTheDocument();
// });

// test('renders correct content from transitions page', async () => {
//   const { getByLabelText } = render(<Main />);

//   // const occupationInput = getByPlaceholderText('Select occupation...');
//   const occupationInput = getByTestId('selectComponent');
//   const stateInput = getByPlaceholderText('Select state...');

//   expect(occupationInput).not.toBeNull();
//   expect(stateInput).not.toBeNull();
// });

test('allows user to select occupation and state from select menus', async () => {
  const { getByTestId, getAllByTestId, getAllByText, findByText } = render(
    <Main />
  );
  const selectOct = getAllByTestId('occupation-select');
  userEvent.selectOptions(selectOct[0], '01-2345 | Doctor');
  // userEvent.selectOptions(stateInput, 'California');

  // fireEvent.change(occupationInput, {target: {value: 1}});
  // fireEvent.change(stateInput, { target: {value: 1} });

  const matrixButton = getAllByText('See a Matrix')[0];
  userEvent.click(matrixButton); //render table

  wait(() => expect(findByText(/Job Transitions/i)).not.toBeEmpty()); //check table renders content correctly

  // getAllByText('See a Treechart')[0].click();
  // await wait(() => expect(findByText(/Job Transitions/i)).not.toBeEmpty());
});

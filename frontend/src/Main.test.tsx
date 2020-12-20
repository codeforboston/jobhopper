import React from 'react';
import { render, wait } from '@testing-library/react';
import Main from './Main';
import {  } from '@testing-library/react';
import { fireEvent, getQueriesForElement } from '@testing-library/dom';
import { Input, Select } from '@material-ui/core';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

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

describe('transitions', () => {

  it('allows user to select occupation and state from select menus', async () => {

    const { getAllByTestId, getByLabelText, findByText, getAllByText, getByTestId, findByTestId} = render(<Main/>);
  
    const selectOct = getAllByTestId('occupation-select')[0];
    
    const stateOct = getAllByTestId('state-select')[0];
    
  userEvent.selectOptions(selectOct, '01-2345 | Doctor');
  
  userEvent.selectOptions(stateOct, 'California');
  
  
  // getByLabelText('See a Matrix').click(); //render table
  
  const matrixButton = getAllByText('See a Matrix')[0];
  userEvent.click(matrixButton); //render table

  wait(() => expect(findByText(/Job Transitions/i)).not.toBeEmpty()); //check table renders content correctly

  
});

it('tests user button interaction on display treemap', async () => {

  const mockOnSubmit = jest.fn();
  
  const {getAllByTestId, getByRole, getAllByText, findByTestId} = render(<Main onSubmit={mockOnSubmit}/>);

  const selectOct = getAllByTestId('occupation-select')[0];
    
  const stateOct = getAllByTestId('state-select')[0];
  

  await act(async()=>{
    //test valid selections in dropdowns.
    userEvent.selectOptions(selectOct, '01-2345 | Doctor');
  
    userEvent.selectOptions(stateOct, 'California');

  })

  await act(async()=>{
    const treechartButton = getAllByText('See a Treechart')[0];
    userEvent.click(treechartButton); //render treechart
  })

  wait(() => expect(findByTestId("tree-map")).not.toBeEmpty()); //check table renders content correctly
  expect(mockOnSubmit).toHaveBeenCalled();
    




});

});


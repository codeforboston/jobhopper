import '@testing-library/jest-dom/extend-expect';
import { render, wait, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
// import { render, wait } from '@testing-library/react';
import Main from './Main';

import {  } from '@testing-library/react';
import { fireEvent, getQueriesForElement } from '@testing-library/dom';
import { Input, Select } from '@material-ui/core';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import Results, {ResultsProps} from './ui/Results/Results';
import { ResultsContainer } from './ui/Results/ResultsContainer';
import { StyledSecondary } from './ui/Common';
import {ButtonProps} from './ui/Button'
import {TransitionPageContainer} from './ui/TransitionPage/TransitionPageContainer';

import { createStore } from './ducks';
import { Provider } from 'react-redux';


// renders the Main component, fills out the transition form, and renders the results table using the FakeApi. This tests interactions with the form and the container logic.

const mockSelectTransition = '../../api';

describe('transitions results page', () => {
  test('can get anything by test Id', () => {
    const {
      getByText,
      getByTestId,
      getAllByTestId,
      getAllByText,
      findByText,
      findByTestId,
    } = render(<Main />);
    const selectOccupation = getAllByTestId('occupation-select');
    expect(selectOccupation[0]).toBeInTheDocument();
  });

  test('can get anything by text', () => {
    const {
      getByText,
      getByTestId,
      getAllByTestId,
      getAllByText,
      findByText,
      findByTestId,
    } = render(<Main />);

    const occu = getAllByText(/optional/i);

    expect(occu[0]).toBeInTheDocument();
  });

  test('matrix not in the document', () => {
    const {
      getByText,
      getByTestId,
      getAllByTestId,
      getAllByText,
      findByText,
      findByTestId,
      queryByText,
    } = render(<Main />);

    expect(queryByText(/Job Transitions/i)).not.toBeInTheDocument();
  });

  test('can select in dropdown', async () => {
    const { getByTestId, queryByText, findByText } = render(<Main />);
    const selectOccupation = getByTestId('occupation-select');
    expect(selectOccupation).toBeTruthy();

    userEvent.selectOptions(selectOccupation, '01-2345 | Doctor');

    // wait await(() => expect(queryByText(/Job Transitions/i)).toBeInTheDocument())
    await wait(() => expect(findByText(/Job Transitions/i)).not.toBeEmpty());
  });
});

// test('allows user to select occupation and state from select menus', async () => {
//   const { getByText, getByTestId, getAllByTestId, getAllByText, findByText, findByTestId } = render(
//     <Main />
//   );
//   // await waitFor(() => expect(findByText(/Job Transitions/i)).not.toBeEmpty()); //check table renders content correctly

//   await waitFor(() => findByText(/Job Transitions/i));

//   const selectState = getAllByTestId('state-select');
//   expect(selectState).toBeTruthy();

//   userEvent.selectOptions(selectState[0], 'California');

//   const matrixButton = getAllByText('See a Matrix')[0];
//   userEvent.click(matrixButton); //render table

//   const treeMapButton = getAllByText('See a Treechart')[0]
//   userEvent.click(treeMapButton)
//   // getAllByText('See a Treechart')[0].click();
//   // await wait(() => expect(findByText(/Job Transitions/i)).not.toBeEmpty());

//   const treeMap = findByTestId('tree-map')
//   await waitFor(() => expect(treeMap).toBeEmpty())
// });

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

  const transByFindText = await findByText(/Job Transitions/i)
  
  expect(transByFindText).not.toBeEmpty(); //check table renders content correctly

  
});

it('calls on onclick method', async () => {
  const mockOnSubmit = jest.fn(() => {
    return console.log("mockOnSubmit has been called!");
  });

  interface IMockedProps {
    label: string
    testid: string
    onClick: any
    disabled: any
    selected: any
  }

  const mockedProps: IMockedProps = {
    label: "See a Matrix",
    testid: "See a Matrix",
    onClick: mockOnSubmit, 
    disabled: false,
    selected: true
  } 
  
  const props = mockedProps

  const {getAllByTestId, getByRole, getAllByText, findByTestId} = render(<StyledSecondary {...props} />);

  const matrixButton = getAllByTestId('See a Matrix')[0];

  await act(async()=>{
    userEvent.click(matrixButton)
  })

  expect(mockOnSubmit).toHaveBeenCalled();

})


it('displays a tree-chart of data', async () => {
  const mockOnSubmit = jest.fn(() => {
    return console.log("tree-chart button clicked")
  
  });

  interface IMockedProps {
    label: string
    testid: string
    onClick: any
    disabled: any
    selected: any
  }

  const mockedProps: IMockedProps = {
    label: "See a Treechart",
    testid: "See a Treechart",
    onClick: mockOnSubmit, 
    disabled: false,
    selected: true
  } 

  const {getByText, getAllByText, findAllByTestId, findByTestId} = render(
    <Provider store={createStore()}>
      {/* <TransitionPageContainer /> */}
      <ResultsContainer />
    </Provider>
  )

  const treeButton = getAllByTestId('tree-map-button')[0]
  
  treeButton.onclick = mockOnSubmit
  

  userEvent.click(treeButton)


  const treeMap = await findByTestId('tree-map')
  

  expect(treeMap).toBeInTheDocument()



})


});

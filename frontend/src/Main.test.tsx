import '@testing-library/jest-dom/extend-expect';
import { render, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Main from './Main';
import {OccupationSelect, Select} from './ui/Select/Select';
import {  } from '@testing-library/react';
import { findByTestId, fireEvent, getAllByRole, getAllByTestId, getByRole, getByTestId, getQueriesForElement, queryByRole, queryByText, within } from '@testing-library/dom';
import { MenuItem } from '@material-ui/core';
import Results, {ResultsProps} from './ui/Results/Results';
import { ResultsContainer } from './ui/Results/ResultsContainer';
import { StyledSecondary } from './ui/Common';
import {ButtonProps} from './ui/Button'
import {TransitionPageContainer} from './ui/TransitionPage/TransitionPageContainer';

import { createStore } from './ducks';
import { Provider } from 'react-redux';

//from Mocha & MaterialUI-testing suite
import { getClasses, createMount} from '@material-ui/core/test-utils';


// renders the Main component, fills out the transition form, and renders the results table using the FakeApi. This tests interactions with the form and the container logic.

const mockSelectTransition = '../../api';

describe('<Select /> ', ()=>{
  beforeEach(() => {
    jest.resetAllMocks();
  });
  
  afterEach(() => {
    cleanup();
  });

  it('should be able to mount Select component', ()=>{
    const { container, getByRole } = render(
      <OccupationSelect occupations = {[{'code':'01-2345', 'name':'Doctor'}]}/>
        );
    
    fireEvent.input(getByRole('textbox'), {target: { value: '01-2345 | Doctor'}})

    expect( container.querySelector('input')).toBeInTheDocument();
    expect( getByRole('textbox')).toHaveAttribute('value', '01-2345 | Doctor');

  })
  
})


describe('transitions results page', () => {

  beforeEach(() => {
    jest.resetAllMocks();
  });
  
  afterEach(() => {
    cleanup();
  });

  test('can get anything by test Id', () => {
    const {
      
      getAllByTestId,
     
    } = render(<Main />);
    const selectOccupation = getAllByTestId('occupation-select');
    expect(selectOccupation[0]).toBeInTheDocument();
  });

  test('can get anything by text', () => {
    const {getAllByText} = render(<Main />);

    const occu = getAllByText(/optional/i);

    expect(occu[0]).toBeInTheDocument();
  });

  test('Can change OccupationSelect input value', async() => {
    const {
      findByText,
      container,
      getAllByRole,
      queryByText,
      getByRole,
      getByTestId
    } = render(<Main />);

    fireEvent.input(getAllByRole('textbox')[0], {target: { value: '01-2345 | Doctor'}})
    userEvent.selectOptions(getByTestId('occupation-select'), '01-2345 | Doctor')

    expect( container.querySelector('input')).toBeInTheDocument();
    expect( getAllByRole('textbox')[0]).toHaveAttribute('value', '01-2345 | Doctor');
    const transByFindText = await findByText(/Job Transitions/i);

  });

});





// const {
//   getByText,
//   getByLabelText,
//   getAllByTestId,
//   findByText,
//   getByPlaceholderText,
//   getByDisplayValue,
//   getByTestId,
// } = render(<Main />);

// describe('transitions', () => {

//   it('allows user to select occupation and state from select menus', async () => {

//     const { getAllByTestId, getByLabelText, findByText, getAllByText, getByTestId, findByTestId} = render(<Main/>);
  
//     const selectOct = getAllByTestId('occupation-select')[0];
    
//     const stateOct = getAllByTestId('state-select')[0];
    
//   userEvent.selectOptions(selectOct, '01-2345 | Doctor');
  
//   userEvent.selectOptions(stateOct, 'California');
  
  
//   const matrixButton = getAllByText('See a Matrix')[0];
//   userEvent.click(matrixButton); //render table

//   const transByFindText = await findByText(/Job Transitions/i)
  
//   expect(transByFindText).not.toBeEmpty(); //check table renders content correctly

  
// });

// it('calls on onclick method', async () => {
//   const mockOnSubmit = jest.fn(() => {
//     return console.log("mockOnSubmit has been called!");
//   });

//   interface IMockedProps {
//     label: string
//     testid: string
//     onClick: any
//     disabled: any
//     selected: any
//   }

//   const mockedProps: IMockedProps = {
//     label: "See a Matrix",
//     testid: "See a Matrix",
//     onClick: mockOnSubmit, 
//     disabled: false,
//     selected: true
//   } 
  
//   const props = mockedProps

//   const {getAllByTestId, getByRole, getAllByText, findByTestId} = render(<StyledSecondary {...props} />);

//   const matrixButton = getAllByTestId('See a Matrix')[0];

//   await act(async()=>{
//     userEvent.click(matrixButton)
//   })

//   expect(mockOnSubmit).toHaveBeenCalled();

// })


// it('displays a tree-chart of data', async () => {
//   const mockOnSubmit = jest.fn(() => {
//     return console.log("tree-chart button clicked")
  
//   });

//   interface IMockedProps {
//     label: string
//     testid: string
//     onClick: any
//     disabled: any
//     selected: any
//   }

//   const mockedProps: IMockedProps = {
//     label: "See a Treechart",
//     testid: "See a Treechart",
//     onClick: mockOnSubmit, 
//     disabled: false,
//     selected: true
//   } 

//   const {getByText, getAllByText, findAllByTestId, findByTestId} = render(
//     <Provider store={createStore()}>
//       {/* <TransitionPageContainer /> */}
//       <ResultsContainer />
//     </Provider>
//   )

//   const treeButton = getAllByTestId('tree-map-button')[0]
  
//   treeButton.onclick = mockOnSubmit
  

//   userEvent.click(treeButton)


//   const treeMap = await findByTestId('tree-map')
  

//   expect(treeMap).toBeInTheDocument()



// })


// });

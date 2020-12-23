import '@testing-library/jest-dom/extend-expect';
import { render, wait, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
// import { render, wait } from '@testing-library/react';
import Main from './Main';

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

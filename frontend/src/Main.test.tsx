import '@testing-library/jest-dom/extend-expect';
import { render, cleanup, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Main from './Main';
import { OccupationSelect, Select } from './ui/Select/Select';
import '@testing-library/jest-dom/extend-expect';
import {
  findByTestId,
  findByText,
  findByTitle,
  fireEvent,
  getAllByRole,
  getAllByTestId,
  getByLabelText,
  getByRole,
  getByTestId,
  getByText,
  getQueriesForElement,
  prettyDOM,
  queryByRole,
  queryByText,
  within,
} from '@testing-library/dom';
import { MenuItem } from '@material-ui/core';
import Results, { ResultsProps } from './ui/Results/Results';
import { ResultsContainer } from './ui/Results/ResultsContainer';
import { StyledSecondary } from './ui/Common';
import { ButtonProps } from './ui/Button';
import { TransitionPageContainer } from './ui/TransitionPage/TransitionPageContainer';
import selectEvent from 'react-select-event';
import { createStore } from './ducks';
import { Provider } from 'react-redux';

//from Mocha & MaterialUI-testing suite
import {
  getClasses,
  createMount,
  createRender,
} from '@material-ui/core/test-utils';
import { resolve } from 'dns';

// renders the Main component, fills out the transition form, and renders the results table using the FakeApi. This tests interactions with the form and the container logic.

const mockSelectTransition = '../../api';

describe('<Select /> ', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it('should be able to mount Select component', async () => {
    const mockOnChange = jest.fn();

    const { container, getByRole, getByTestId, getByLabelText } = render(
      <OccupationSelect
        occupations={[{ code: '01-2345', name: 'Doctor' }]}
        onChange={mockOnChange}
      />
    );

    const selectInput = getByLabelText('occupation-select');

    await selectEvent.select(selectInput, ['01-2345 | Doctor']);

    expect(mockOnChange.mock.calls).toHaveLength(1);

    expect(container.querySelector('input')).toBeInTheDocument();
  });
});

describe('transitions results page', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  test('can get anything by text', () => {
    const { getAllByText } = render(<Main />);

    const occu = getAllByText(/optional/i);

    expect(occu[0]).toBeInTheDocument();
  });

  test('Can select option in OccupationSelect Select', async () => {
    const {
      container,
      getByTestId,
      getByLabelText,
      getByText,
      queryByText,
    } = render(<Main />);

    await waitFor(() => {
      expect(getByText('Enter occupation')).toBeInTheDocument();
    });

    const occupationSelect = getByLabelText('occupation-select');
    await selectEvent.select(occupationSelect, '01-2345 | Doctor');

    userEvent.click(getByTestId('See a Matrix'));

    await waitFor(() =>
      expect(getByText(/Job Transitions/i)).toBeInTheDocument()
    );

    userEvent.click(getByTestId('tree-map-button'));

    await waitFor(() => {
      expect(getByTestId('tree-map')).toBeInTheDocument();
      expect(queryByText(/Job Transitions/i)).not.toBeInTheDocument();
    });
  });

  test('Can select option in stateSelect Select', async () => {
    const {
      container,
      getByTestId,
      getByLabelText,
      getByText,
      queryByText,
      debug,
    } = render(<Main />);

    await waitFor(() => {
      expect(getByText('Enter occupation')).toBeInTheDocument();
    });

    const occupationSelect = getByLabelText('occupation-select');
    await selectEvent.select(occupationSelect, '01-2345 | Doctor');

    await waitFor(() => {
      expect(queryByText('Job Transitions')).not.toBeInTheDocument();
    });

    userEvent.click(getByTestId('See a Matrix'));

    await waitFor(() => {
      expect(getByText('Job Transitions')).toBeInTheDocument();
    });

    await selectEvent.select(getByLabelText('state-select'), 'California');

    userEvent.click(getByTestId('See a Matrix'));

    await waitFor(() => expect(getByText('California')).toBeInTheDocument());
  });
});

test('renders percentage as expected', () => {
  const n = 34.3943;
  expect(n).toBeDefined();
});

import {
  cleanup,
  render,
  waitFor,
  waitForElementToBeRemoved,
  RenderResult,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import selectEvent from 'react-select-event';
import Main from './Main';
import { OccupationSelect } from './ui/Select/Select';

// renders the Main component, fills out the transition form, and renders the
// results table using the FakeApi. This tests interactions with the form and
// the container logic.

beforeEach(() => {
  jest.resetAllMocks();
});

afterEach(() => {
  cleanup();
});

describe('OccupationSelect', () => {
  it('Can use OccupationSelect', async () => {
    const mockOnChange = jest.fn();
    const mockFetchOptions = async () => {
      return [{ code: '01-2345', name: 'Doctor' }];
    };

    const { container, getByLabelText } = render(
      <OccupationSelect
        fetchOptions={mockFetchOptions}
        occupations={[{ code: '01-2345', name: 'Doctor' }]}
        onChange={mockOnChange}
      />
    );

    await selectEvent.select(getByLabelText('occupation-select'), [
      '01-2345 | Doctor',
    ]);

    expect(mockOnChange.mock.calls).toHaveLength(1);
    expect(container.querySelector('input')).toBeInTheDocument();
  });
});

describe('Main', () => {
  let renderResult: RenderResult;
  beforeEach(() => {
    renderResult = render(<Main />);
  });

  it('Renders transitions page', () => {
    const { getByText } = renderResult;

    expect(getByText(/Occupation Transitions/i)).toBeInTheDocument();
  });

  it('Loads the transitions page', async () => {
    await waitForPageToLoad();
  });

  async function waitForPageToLoad() {
    const { getByText, queryAllByText } = renderResult;
    await waitForElementToBeRemoved(() => queryAllByText(/Loading.../i));
    expect(getByText(/Select occupation.../i)).toBeInTheDocument();
    expect(getByText(/Select state.../i)).toBeInTheDocument();
  }

  it('Can show national transitions', async () => {
    await waitForPageToLoad();

    const { getByTestId, getByLabelText, getByText } = renderResult;

    await selectEvent.select(
      getByLabelText('occupation-select'),
      '01-2345 | Doctor'
    );

    await waitFor(() => expect(getByText(/move to\?/i)).toBeInTheDocument());

    userEvent.click(getByTestId('treemap-button'));

    await waitFor(() => {
      expect(getByTestId('treemap')).toBeInTheDocument();
    });
  });

  it('Can show state transitions', async () => {
    await waitForPageToLoad();

    const { getByLabelText, getByText, getByTestId } = renderResult;

    await new Promise(resolve => setTimeout(resolve, 100));

    await selectEvent.select(
      getByLabelText('occupation-select'),
      '01-2345 | Doctor'
    );
    await selectEvent.select(getByLabelText('state-select'), 'California');

    await waitFor(() => expect(getByText(/move to\?/i)).toBeInTheDocument());

    userEvent.click(getByTestId('treemap-button'));

    await waitFor(() => {
      expect(getByTestId('treemap')).toBeInTheDocument();
      expect(renderResult.getAllByText(/California/i)).not.toBe(null);
    });
  });
});

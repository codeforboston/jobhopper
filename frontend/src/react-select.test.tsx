import React from 'react';
import Select from 'react-select';
import { render } from '@testing-library/react';
import selectEvent from 'react-select-event';

it('works', async () => {
  const { getByTestId, getByLabelText } = render(
    <form data-testid="form">
      <label htmlFor="food">Food</label>
      <Select
        options={[
          { label: 'Strawberry', value: 'strawberry' },
          { label: 'Mango', value: 'mango' },
          { label: 'Chocolate', value: 'chocolate' },
        ]}
        name="food"
        inputId="food"
        isMulti
      />
    </form>
  );

  expect(getByTestId('form')).toHaveFormValues({ food: '' }); // empty select

  // select two values...
  await selectEvent.select(getByLabelText('Food'), ['Strawberry', 'Mango']);
  expect(getByTestId('form')).toHaveFormValues({
    food: ['strawberry', 'mango'],
  });

  // ...and add a third one
  await selectEvent.select(getByLabelText('Food'), 'Chocolate');
  expect(getByTestId('form')).toHaveFormValues({
    food: ['strawberry', 'mango', 'chocolate'],
  });
});

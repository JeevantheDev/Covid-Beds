/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { HospitalFilterInput, Iprops } from '../HospitalFilterInput';
import '@testing-library/jest-dom/extend-expect';
import TestRenderer from 'react-test-renderer';
import { HOSPITAL_TYPE } from '../../../src/entity/constant';

afterEach(cleanup);

function renderFilterInputForm(props: Partial<Iprops> = {}) {
  const defaultProps: Iprops = {
    onFilterSubmit(hospitalType: string) {
      return;
    },
  };

  return render(<HospitalFilterInput {...defaultProps} {...props} />);
}

test('should display a blank filter input', async () => {
  const { findByTestId } = renderFilterInputForm();
  const filterInputForm = await findByTestId('filter-input-form');
  expect(filterInputForm).toHaveFormValues({ filterInput: 'any' });
});

test('should allow user to submit for filter', async () => {
  const onFilterSubmit = jest.fn();
  const { findByTestId } = renderFilterInputForm({ onFilterSubmit });
  const filterInput = await findByTestId('filterInput');
  const submit = await findByTestId('submit');

  fireEvent.change(filterInput, { target: { value: HOSPITAL_TYPE.PVT } });
  fireEvent.click(submit);

  expect(onFilterSubmit).toHaveBeenCalledWith('PVT');
});

it('matches snapshot', () => {
  const onFilterSubmit = jest.fn();
  const tree = TestRenderer.create(
    <HospitalFilterInput onFilterSubmit={onFilterSubmit}></HospitalFilterInput>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

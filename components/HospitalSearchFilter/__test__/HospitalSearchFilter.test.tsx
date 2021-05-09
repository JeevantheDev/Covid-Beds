/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { HospitalSearchFilter, Iprops } from '../HospitalSearchFilter';
import '@testing-library/jest-dom/extend-expect';
import TestRenderer from 'react-test-renderer';

afterEach(cleanup);

function renderFilterSearchForm(props: Partial<Iprops> = {}) {
  const defaultProps: Iprops = {
    onSearchSubmit(state: string, zipcode: string) {
      return;
    },
  };

  return render(<HospitalSearchFilter {...defaultProps} {...props} />);
}

test('should display a blank search box', async () => {
  const { findByTestId } = renderFilterSearchForm();
  const searchSectionForm = await findByTestId('search-section-form');
  expect(searchSectionForm).toHaveFormValues({
    state: '',
    zipcode: '',
  });
});

test('should allow user to submit for search', async () => {
  const onSearchSubmit = jest.fn();
  const { findByTestId } = renderFilterSearchForm({ onSearchSubmit });
  const state = await findByTestId('state');
  const zipcode = await findByTestId('zipcode');
  const submit = await findByTestId('submit');

  fireEvent.change(state, { target: { value: 'Odisha' } });
  fireEvent.change(zipcode, { target: { value: '751003' } });
  fireEvent.click(submit);

  expect(onSearchSubmit).toHaveBeenCalledWith('Odisha', '751003');
});

it('matches snapshot', () => {
  const onSearchSubmit = jest.fn();
  const tree = TestRenderer.create(
    <HospitalSearchFilter onSearchSubmit={onSearchSubmit}></HospitalSearchFilter>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

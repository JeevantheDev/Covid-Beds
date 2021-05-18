/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */
import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { HospitalCard, Iprops } from '../HospitalCard';
import '@testing-library/jest-dom/extend-expect';
import TestRenderer from 'react-test-renderer';

afterEach(cleanup);

function renderHospitalCard(props: Partial<Iprops> = {}) {
  const defaultProps: Iprops = {
    hospitalDetail: {
      id: 1,
      hospitalImage: 'imageURL',
      nameHospital: 'SUM Covid Care',
      hospitalType: 'PVT',
      locationState: 'Odisha',
      locationCountryCode: 'IN',
      HospitalBeds: [
        {
          id: 4,
          totalBeds: 1500,
          currentBeds: 1000,
        },
      ],
    },
  };

  return render(<HospitalCard {...defaultProps} {...props} />);
}

test('should display a hospital card', async () => {
  const { findByTestId } = renderHospitalCard();
  const hospitalCard = await findByTestId('hospital-card');
  ['SUM Covid Care', 'PVT', 'Odisha', 'IN', 1500, 1000].map((text: any) => {
    expect(hospitalCard).toHaveTextContent(text.toString());
  });
});

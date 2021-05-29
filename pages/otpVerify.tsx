/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useEffect } from 'react';
import Sawo from 'sawo';
import { SeoWrapper } from '../components/shared/SeoWrapper';
import { useRouter } from 'next/router';

const otpVerify = () => {
  const router = useRouter();
  useEffect(() => {
    const config = {
      // should be same as the id of the container created on 3rd step
      containerID: 'sawo-container',
      identifierType: 'phone_number_sms',
      apiKey: process.env.SAWO_API,
      onSuccess: (payload) => {
        localStorage.setItem('otpSuccessUser', JSON.stringify(payload));
        router.back();
      },
    };

    const sawo = new Sawo(config);
    sawo.showForm();
  }, []);
  return (
    <SeoWrapper title="Covid Beds | OTP Verify" canonicalPath="/otpVerify">
      <div style={{ width: '100vw', height: '100vh', display: 'grid', placeItems: 'center' }}>
        <div id="sawo-container" style={{ height: '300px', width: '300px' }}></div>
      </div>
    </SeoWrapper>
  );
};

export default otpVerify;

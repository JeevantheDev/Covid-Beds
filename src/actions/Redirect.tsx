/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

interface IrouterProps {
  to: string;
  ssr?: boolean;
}

export const Redirect: React.FC<IrouterProps> = ({ to, ssr }) => {
  const router = useRouter();
  useEffect(() => {
    if (ssr) {
      window.location.pathname = to;
    } else {
      router.push(to);
    }
  }, []);
  return null;
};

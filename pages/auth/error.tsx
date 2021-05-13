/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';
import { useSession } from 'next-auth/client';

export default function error() {
  const [session] = useSession();
  console.log(session);
  return (
    <div>
      <h1>Error page</h1>
    </div>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useState } from 'react';
import useSWR from 'swr';
import axios from 'axios';

export default function useRequest(request, initialData = {}) {
  const { data, error, ...rest } = useSWR(
    request && JSON.stringify(request),
    () =>
      axios(request || {}).then((response) => {
        return response.data;
      }),
    {
      initialData: initialData && {
        status: 200,
        statusText: 'InitialData',
        headers: {},
        data: initialData,
      },
    }
  );

  return {
    data,
    error,
    loading: !data && !error,
    ...rest,
  };
}

export const useApiHandler = (apiCall: any) => {
  const [requestState, setRequestState] = useState({
    error: null,
    data: null,
    loading: false,
  });
  const handler = async (...data: any[]) => {
    setRequestState({ error: null, data: null, loading: true });
    try {
      const json = await apiCall(...data);
      setRequestState({ error: null, data: json.data, loading: false });
      return json.data;
    } catch (err) {
      const message: string = (err.response && err.response.data) || 'Oops, something went wrong';
      setRequestState({ error: message, data: null, loading: false });
      return Promise.reject(message);
    }
  };
  return [handler, { ...requestState }];
};

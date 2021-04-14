import SpinnerLoader from 'containers/components/loader';
import React, { useState } from 'react';
import { Props } from "./propState";
import { LoadingContext } from './userLoading';

export function LoadingProvider(props: Props) {
  const [loading, setLoading] = useState(false);

  const contextValue = {
    loading: loading,
    showLoading: () => setLoading(true),
    hideLoading: () => setLoading(false)
  };

  return (
    <LoadingContext.Provider value={contextValue}>
      {loading && <SpinnerLoader />}
      {props.children}
    </LoadingContext.Provider>
  );
}
import React, {useContext} from 'react';

export const LoadingContext = React.createContext({
  loading: false,
  showLoading: () => {},
  hideLoading: () => {},
});

export const useLoading = () => useContext(LoadingContext);

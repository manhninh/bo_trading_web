import React, {useContext} from 'react';

type ContextType = {
  loading: boolean;
  showLoading: () => void;
  hideLoading: () => void;
};

export const LoadingContext = React.createContext<ContextType>({
  loading: false,
  showLoading: () => {},
  hideLoading: () => {},
});

export const useLoading = () => useContext(LoadingContext);

import React, { useContext } from 'react';

export const ErrorContext = React.createContext({
  addError: (err: Response, message: string | null) => ({}),
});

function useError() {
  const { addError } = useContext(ErrorContext);
  return { addError };
}

export default useError;

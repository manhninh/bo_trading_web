import { LOCAL_STORE, RESPONSE_STATUS } from 'constants/system';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

export const ErrorContext = React.createContext({
  addError: (err: Response, message: null) => ({}),
});

export default function ErrorProvider({ children }: any) {
  const history = useHistory();
  const { i18n } = useTranslation();

  const addError = async (err: Response, message: null) => {
    // if (err.status === RESPONSE_STATUS.NOT_FOUND)
    //   notification.error(
    //     i18n.language === 'vi'
    //       ? 'Máy chủ gặp sự cố, vui lòng liên hệ với quản trị viên'
    //       : 'There is a problem with the server, please contact the administrator',
    //   );

    if (err.status === RESPONSE_STATUS.FORBIDDEN) {
      localStorage.removeItem(LOCAL_STORE.TOKEN);
      history.push('/');
    }

    if (err.status === RESPONSE_STATUS.INTERVAL_SERVER) {
      const error = await err.json();
      // notification.error(error.error_description || message || '');
    }
  };

  const contextValue = {
    addError: useCallback((err, message) => addError(err, message), []),
  };

  return <ErrorContext.Provider value={contextValue}>{children}</ErrorContext.Provider>;
}

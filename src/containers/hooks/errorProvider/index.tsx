import {RESPONSE_STATUS} from 'constants/system';
import React, {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {toast} from 'react-toastify';
import {signOut} from 'routers/redux/slice';
import {Props} from './propState';
import {ErrorContext} from './useError';

export default function ErrorProvider({children}: Props) {
  const history = useHistory();
  const dispatch = useDispatch();

  const addError = async (err: Response | null, message: null) => {
    if (err) {
      if (err.status === RESPONSE_STATUS.NOT_FOUND) {
        toast.error('There is a problem with the server, please contact the administrator');
        return;
      }

      if (err.status === RESPONSE_STATUS.FORBIDDEN) {
        dispatch(signOut());
        history.push('/');
        return;
      }

      if (err.status === RESPONSE_STATUS.INTERVAL_SERVER) {
        const error = await err.json();
        toast.error(error.error_description || message || '');
        return;
      }
    } else toast.error(message);
  };

  const contextValue = {
    addError: useCallback((err, message) => addError(err, message), []),
  };

  return <ErrorContext.Provider value={contextValue}>{children}</ErrorContext.Provider>;
}

// "DOT/BTC",
// "ETC/BTC",
// "UNI/BTC",
// "ENJ/BTC",
// "SOL/BTC",
// "LUNA/BTC",
// "XLM/BTC",
// "FIL/BTC",
// "REEF/BTC",
// "CHZ/BTC",
// "ONE/BTC",
// "AAVE/BTC",
// "SUSHI/BTC",
// "CAKE/BTC",
// "YFI/BTC",
// "TRX/BTC",
// "SXP/BTC",
// "DASH/BTC",
// "OMG/BTC",
// "CELR/BTC",
// "CRV/BTC",
// "FET/BTC",
// "QTUM/BTC",
// "AXS/BTC",
// "ALICE/BTC",
// "ICP/BTC",
// "FTM/BTC",
// "ZIL/BTC",
// "OGN/BTC",
// "SNX/BTC",
// "XVG/BTC",
// "DODO/BTC",
// "LRC/BTC",
// "ONT/BTC",
// "ARK/BTC",
// "NEAR/BTC",
// "DIA/BTC",
// "1INCH/BTC",
// "POND/BTC",
// "CHR/BTC",
// "AVA/BTC",
// "FRONT/BTC",
// "PERL/BTC",
// "VET/BTC",
// "WBTC/BTC",
// "NMR/BTC",
// "RUNE/BTC"

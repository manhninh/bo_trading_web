import {history, persistor, store} from 'boot/configureStore';
import {ConnectedRouter} from 'connected-react-router';
import SpinnerLoader from 'containers/components/loader';
import ErrorProvider from 'containers/hooks/errorProvider';
import {LoadingProvider} from 'containers/hooks/loadingProvider';
import React, {Suspense} from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import NavigationComponent from 'routers';
import './App.css';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<SpinnerLoader />} persistor={persistor}>
        <ConnectedRouter history={history}>
          <ErrorProvider>
            <LoadingProvider>
              <Suspense fallback={<SpinnerLoader />}>
                <NavigationComponent />
              </Suspense>
            </LoadingProvider>
          </ErrorProvider>
        </ConnectedRouter>
      </PersistGate>
    </Provider>
  );
};

export default App;

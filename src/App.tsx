import {history, persistor, store} from 'boot/configureStore';
import {ConnectedRouter} from 'connected-react-router';
import LoaderPage from 'containers/components/loader';
import ErrorProvider from 'containers/hooks/errorProvider';
import {Suspense} from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import NavigationComponent from 'routers';
import './App.css';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ConnectedRouter history={history}>
          <ErrorProvider>
            <Suspense fallback={<LoaderPage />}>
              <NavigationComponent />
            </Suspense>
          </ErrorProvider>
        </ConnectedRouter>
      </PersistGate>
    </Provider>
  );
};

export default App;

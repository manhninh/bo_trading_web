import RootComponent from 'boot';
import store from 'boot/configureStore';
import {ConnectedRouter} from 'connected-react-router';
import ErrorProvider from 'containers/hooks/errorProvider';
import {Suspense} from 'react';
import {Provider} from 'react-redux';
import {Switch} from 'react-router';
import {PersistGate} from 'redux-persist/integration/react';

const App = () => {
  return (
    <Provider store={store.store}>
      <PersistGate loading={null} persistor={store.persistor}>
        <ConnectedRouter history={store.history}>
          <ErrorProvider>
            <Suspense fallback={<div>loading</div>}>
              <Switch>
                <RootComponent />
              </Switch>
            </Suspense>
          </ErrorProvider>
        </ConnectedRouter>
      </PersistGate>
    </Provider>
  );
};

export default App;

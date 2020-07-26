import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

import App from './components/app/app.jsx';
import reducer from './reducer/reducer.js';
import {
  ActionCreator,
  Operation as DataOperation,
} from './reducer/data/data.js';
import {getOffers} from './reducer/data/selectors.js';
import {createAPI} from './reducer/api.js';

// const onUnauthorized = () => {
//   store.dispatch(
//     ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH)
//   );
// };

const api = createAPI(() => {});

const store = createStore(
  reducer,
  // window.__REDUX_DEVTOOLS_EXTENSION__
  //   ? window.__REDUX_DEVTOOLS_EXTENSION__()
  //   : (f) => f
  composeWithDevTools(applyMiddleware(thunk.withExtraArgument(api)))
);

store.dispatch(DataOperation.loadOffers());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector(`#root`)
);

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

import {AuthorizationStatus} from './const.js';

import App from './components/app/app.jsx';
import reducer from './reducer/reducer.js';
import {
  Operation as DataOperation,
  ActionCreator as DataActionCreator,
} from './reducer/data/data.js';
import {
  ActionCreator as UserActionCreator,
  Operation as UserOperation,
} from './reducer/user/user.js';
import {createAPI} from './reducer/api.js';

const ERR_TIMEOUT = 5000;

const onUnauthorized = () => {
  store.dispatch(
    UserActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH)
  );
};

const onLoadDataErr = (errMessage) => {
  store.dispatch(DataActionCreator.changeErrMessage(errMessage));
  setTimeout(() => {
    store.dispatch(DataActionCreator.changeErrReason(false));
  }, ERR_TIMEOUT);
};

const api = createAPI(onUnauthorized, onLoadDataErr);

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk.withExtraArgument(api)))
);

store.dispatch(DataOperation.loadOffers());
store.dispatch(UserOperation.checkAuth());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector(`#root`)
);

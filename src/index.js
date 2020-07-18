import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import offers from './mocks/offers.js';
import reviews from './mocks/reviews.js';
import App from './components/app/app.jsx';
import {reducer} from './reducer.js';

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : (f) => f
);

ReactDOM.render(
  <Provider store={store}>
    <App reviews={reviews} />
  </Provider>,
  document.querySelector(`#root`)
);

// offers={offers}

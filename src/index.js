import React from 'react';
import ReactDOM from 'react-dom';

import offers from './mocks/offers.js';
import reviews from './mocks/reviews.js';
import App from './components/app/app.jsx';

ReactDOM.render(
  <App offers={offers} reviews={reviews} />,
  document.querySelector(`#root`)
);

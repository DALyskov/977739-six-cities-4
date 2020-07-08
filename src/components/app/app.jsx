import React from 'react';
import propTypes from 'prop-types';

import {APPROVED_NAME} from '../../const.js';

import Main from '../main/main.jsx';

const App = (props) => {
  return <Main offers={props.offers} />;
};

App.propTypes = {
  offers: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.number.isRequired,
      isPremium: propTypes.bool,
      image: propTypes.string.isRequired,
      price: propTypes.number.isRequired,
      isBookmark: propTypes.bool,
      starsValue: propTypes.number.isRequired,
      name: propTypes.oneOf(APPROVED_NAME).isRequired,
      type: propTypes.string.isRequired,
    })
  ).isRequired,
};

export default App;

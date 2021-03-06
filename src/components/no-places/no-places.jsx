import React from 'react';
import propTypes from 'prop-types';

import {ErrReason} from '../../const';
import ErrMessage from '../err-message/err-message.jsx';

const NoPlaces = (props) => {
  const {errReason} = props;
  return (
    <div className="cities">
      <div className="cities__places-container cities__places-container--empty container">
        <section className="cities__no-places">
          {(errReason === ErrReason.LOAD_OFFERS ||
            errReason === ErrReason.LOAD_REVIEWS ||
            errReason === ErrReason.CHECK_AUTH ||
            errReason === ErrReason.LOAD_FAVORITE_OFFERS ||
            errReason === ErrReason.LOAD_NEARBY_OFFERS) && <ErrMessage />}
          <div className="cities__status-wrapper tabs__content">
            <b className="cities__status">No places to stay available</b>
            <p className="cities__status-description">
              We could not find any property availbale at the moment in
              Dusseldorf
            </p>
          </div>
        </section>
        <div className="cities__right-section"></div>
      </div>
    </div>
  );
};

NoPlaces.propTypes = {
  errReason: propTypes.oneOfType([
    propTypes.bool,
    propTypes.oneOf(Object.values(ErrReason)),
  ]),
};

export default NoPlaces;

import React from 'react';
import propTypes from 'prop-types';

import {MapClassName, PlacesClassNames, HeaderClassNames} from '../../const.js';

import PlaceList from '../places-list/places-list.jsx';

// const PlacesSortingWrapped = withPlacesSorting(PlacesSorting);

const FavoriteItem = (props) => {
  // const {favoriteCity} = props;
  // const isOffers = offersByCity.length > 0;
  // const placesCount = offersByCity.length;

  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="#">
            {/* <span>{favoriteCity}</span> */}
          </a>
        </div>
      </div>
      <div className="favorites__places">{/* <PlaceList /> */}</div>
    </li>
  );
};

export default FavoriteItem;

import React from 'react';
// import propTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

// import {MapClassName, PlacesClassNames, HeaderClassNames} from '../../const.js';

import PlaceList from '../places-list/places-list.jsx';
import {PlacesClassNames, AppRoute, SORTING_ITEMS} from '../../const.js';
import {getFavoriteOffers} from '../../reducer/data/selectors.js';
import {ActionCreator as AppActionCreator} from '../../reducer/state-application/state-application.js';

// const PlacesSortingWrapped = withPlacesSorting(PlacesSorting);

const getFavoriteOffersByCity = (offers, activeCity) => {
  if (offers.lenght === 0 || !activeCity) {
    return [];
  }
  return offers.filter((place) => place.city.name === activeCity);
};

const FavoriteItem = (props) => {
  const {favoriteOffers, favoriteCity, onCityClick} = props;
  // const isOffers = offersByCity.length > 0;
  // const placesCount = offersByCity.length;
  const favoriteOffersByCity = getFavoriteOffersByCity(
    favoriteOffers,
    favoriteCity
  );
  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <Link
            className="locations__item-link"
            to={AppRoute.MAIN}
            onClick={() => {
              onCityClick(favoriteCity);
            }}>
            <span>{favoriteCity}</span>
          </Link>
        </div>
      </div>
      {/* <div className="favorites__places"> */}
      {
        <PlaceList
          offersByCity={favoriteOffersByCity}
          className={PlacesClassNames.FAVORITE}
        />
      }
      {/* </div> */}
    </li>
  );
};

// export default FavoriteItem;

const mapStateToProps = (state) => ({
  // authorizationStatus: getAuthorizationStatus(state),
  // userEmail: getUserEmail(state),
  // activePage: getActivePage(state),
  favoriteOffers: getFavoriteOffers(state),
  // favoriteCities: getFavoriteCities(state),
});

const mapDispatchToProps = (dispatch) => ({
  onCityClick(CityName) {
    dispatch(AppActionCreator.changeActiveCity(CityName));
    dispatch(AppActionCreator.changesortingType(SORTING_ITEMS[0]));
  },
});

export {FavoriteItem};
export default connect(mapStateToProps, mapDispatchToProps)(FavoriteItem);

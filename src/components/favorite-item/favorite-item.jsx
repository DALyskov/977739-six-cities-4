import React from 'react';
import propTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {PlacesClassNames, AppRoute, SORTING_ITEMS} from '../../const.js';

import PlaceList from '../places-list/places-list.jsx';
import {ActionCreator as AppActionCreator} from '../../reducer/state-application/state-application.js';
import {getFavoriteOffers} from '../../reducer/data/selectors.js';

const getFavoriteOffersByCity = (offers, activeCity) => {
  if (offers.lenght === 0 || !activeCity) {
    return [];
  }
  return offers.filter((place) => place.city.name === activeCity);
};

const FavoriteItem = (props) => {
  const {favoriteOffers, favoriteCity, onCityClick} = props;
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

      <PlaceList
        offersByCity={favoriteOffersByCity}
        className={PlacesClassNames.FAVORITE}
      />
    </li>
  );
};

FavoriteItem.propTypes = {
  favoriteOffers: propTypes.arrayOf(
    propTypes.shape({
      bedrooms: propTypes.number.isRequired,
      city: propTypes.shape({
        location: propTypes.shape({
          latitude: propTypes.number.isRequired,
          longitude: propTypes.number.isRequired,
          zoom: propTypes.number.isRequired,
        }).isRequired,
        name: propTypes.string.isRequired,
      }),
      description: propTypes.string.isRequired,
      features: propTypes.arrayOf(propTypes.string.isRequired),
      hostName: propTypes.string.isRequired,
      hostAvatar: propTypes.string.isRequired,
      isHostPro: propTypes.bool,
      hostId: propTypes.number.isRequired,
      id: propTypes.number.isRequired,
      images: propTypes.arrayOf(propTypes.string.isRequired).isRequired,
      isBookmark: propTypes.bool,
      isPremium: propTypes.bool,
      location: propTypes.shape({
        latitude: propTypes.number.isRequired,
        longitude: propTypes.number.isRequired,
        zoom: propTypes.number.isRequired,
      }).isRequired,
      maxAdults: propTypes.number.isRequired,
      previewImg: propTypes.string.isRequired,
      price: propTypes.number.isRequired,
      rating: propTypes.number.isRequired,
      name: propTypes.string.isRequired,
      type: propTypes.string.isRequired,
    })
  ).isRequired,

  favoriteCity: propTypes.string.isRequired,

  onCityClick: propTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  favoriteOffers: getFavoriteOffers(state),
});

const mapDispatchToProps = (dispatch) => ({
  onCityClick(CityName) {
    dispatch(AppActionCreator.changeActiveCity(CityName));
    dispatch(AppActionCreator.changeSortingType(SORTING_ITEMS[0]));
  },
});

export {FavoriteItem};
export default connect(mapStateToProps, mapDispatchToProps)(FavoriteItem);

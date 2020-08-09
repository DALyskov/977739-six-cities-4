import React from 'react';
import propTypes from 'prop-types';
import {connect} from 'react-redux';

import {
  MapClassName,
  PlacesClassNames,
  HeaderClassNames,
  ErrReason,
} from '../../const.js';

import Header from '../header/header.jsx';
import CitiesList from '../cities-list/cities-list.jsx';
import PlacesSorting from '../places-sorting/places-sorting.jsx';
import withPlacesSorting from '../../hocs/with-places-sorting/with-places-sorting.jsx';
import PlaceList from '../places-list/places-list.jsx';
import CityMap from '../city-map/city-map.jsx';
import NoPlaces from '../no-places/no-places.jsx';

import {
  getActiveCity,
  getOffersByCity,
} from '../../reducer/state-application/selectors.js';
import {getErrReason} from '../../reducer/data/selectors.js';

const PlacesSortingWrapped = withPlacesSorting(PlacesSorting);

const Main = (props) => {
  const {offersByCity, activeCity, errReason} = props;
  const isOffers = offersByCity.length > 0;
  const placesCount = offersByCity.length;

  return (
    <div className="page page--gray page--main">
      <Header className={HeaderClassNames.MAIN} />
      <main
        className={`page__main page__main--index ${
          isOffers ? `` : `page__main--index-empty`
        }`}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <CitiesList />
        </div>
        {isOffers ? (
          <div className="cities">
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">
                  {placesCount} places to stay in {activeCity}
                </b>
                <PlacesSortingWrapped />
                <PlaceList
                  offersByCity={offersByCity}
                  className={PlacesClassNames.MAIN}
                />
              </section>
              <div className="cities__right-section">
                <CityMap
                  offersByCity={offersByCity}
                  currentOffer={false}
                  className={MapClassName.MAIN}
                />
              </div>
            </div>
          </div>
        ) : (
          <NoPlaces errReason={errReason} />
        )}
      </main>
    </div>
  );
};

Main.propTypes = {
  offersByCity: propTypes.arrayOf(
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

  activeCity: propTypes.oneOfType([propTypes.string, propTypes.bool]),
  errReason: propTypes.oneOfType([
    propTypes.bool,
    propTypes.oneOf(Object.values(ErrReason)),
  ]),
};

const mapStateToProps = (state) => ({
  activeCity: getActiveCity(state),
  offersByCity: getOffersByCity(state),
  errReason: getErrReason(state),
});

export {Main};
export default connect(mapStateToProps)(Main);

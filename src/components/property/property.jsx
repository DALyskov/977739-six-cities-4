import React from 'react';
import propTypes from 'prop-types';

import {MapClassName, PlacesClassNames} from '../../const.js';
import {getStyleStars} from '../../utils/common.js';

import PlaceList from '../places-list/places-list.jsx';
import ReviewsList from '../reviews-list/reviews-list.jsx';
import CityMap from '../city-map/city-map.jsx';

const Property = (props) => {
  const {nearbyOffers, placeData} = props;
  const {
    isPremium = false,
    images,
    price,
    isBookmark = false,
    rating,
    name,
    type,
    bedrooms,
    maxAdults,
    features,
    hostName,
    hostAvatar,
    isHostPro = false,
    description,
  } = placeData;

  let bookmarkClass = `property__bookmark-button button`;
  let bookmarkStatus = `To bookmarks`;

  if (isBookmark) {
    bookmarkClass += ` property__bookmark-button--active`;
    bookmarkStatus = `In bookmarks`;
  }

  const avatarClass = isHostPro
    ? `property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper`
    : `property__avatar-wrapper user__avatar-wrapper`;

  const starsStyle = getStyleStars(rating);

  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              {/* Сделай переход на main */}
              <a className="header__logo-link" href="main.html">
                <img
                  className="header__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width="81"
                  height="41"></img>
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a
                    className="header__nav-link header__nav-link--profile"
                    href="#">
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__user-name user__name">
                      Oliver.conner@gmail.com
                    </span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {images.map((image) => {
                return (
                  <div key={image} className="property__image-wrapper">
                    <img
                      className="property__image"
                      src={image}
                      alt="Photo studio"></img>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {isPremium ? (
                <div className="property__mark">
                  <span>Premium</span>
                </div>
              ) : (
                ``
              )}
              <div className="property__name-wrapper">
                <h1 className="property__name">{name}</h1>
                <button className={bookmarkClass} type="button">
                  <svg
                    className="property__bookmark-icon"
                    width="31"
                    height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">{bookmarkStatus}</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: starsStyle}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">
                  {rating}
                </span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {type}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {bedrooms} Bedroom{bedrooms !== 1 ? `s` : ``}
                </li>
                <li className="property__feature property__feature--adults">
                  Max {maxAdults} adult{maxAdults !== 1 ? `s` : ``}
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {features.map((feature) => {
                    return (
                      <li key={feature} className="property__inside-item">
                        {feature}
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className={avatarClass}>
                    <img
                      className={hostAvatar}
                      src="img/avatar-angelina.jpg"
                      width="74"
                      height="74"
                      alt="Host avatar"></img>
                  </div>
                  <span className="property__user-name">{hostName}</span>
                </div>
                <div className="property__description">
                  <p className="property__text">{description}</p>
                </div>
              </div>

              <ReviewsList />
            </div>
          </div>

          <CityMap
            offersByCity={nearbyOffers}
            className={MapClassName.PROPERTY}
          />
        </section>

        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <PlaceList
              offersByCity={nearbyOffers}
              className={PlacesClassNames.PROPERTY}
            />
          </section>
        </div>
      </main>
    </div>
  );
};

Property.propTypes = {
  nearbyOffers: propTypes.arrayOf(
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

  placeData: propTypes.oneOfType([
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
    }),
    propTypes.bool,
  ]).isRequired,
};

export default Property;

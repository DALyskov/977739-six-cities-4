import React, {PureComponent} from 'react';
import propTypes from 'prop-types';
import {connect} from 'react-redux';

import {
  MapClassName,
  PlacesClassNames,
  HeaderClassNames,
  ErrReason,
} from '../../const.js';
import {getStyleStars} from '../../utils/common.js';

import Header from '../header/header.jsx';
import PlaceList from '../places-list/places-list.jsx';
import ReviewsList from '../reviews-list/reviews-list.jsx';
import CityMap from '../city-map/city-map.jsx';
import ErrMessage from '../err-message/err-message.jsx';
import NoPlaces from '../no-places/no-places.jsx';
import {Operation as DataOperation} from '../../reducer/data/data.js';
import {ActionCreator as AppActionCreator} from '../../reducer/state-application/state-application.js';
import {
  getOffers,
  getNearbyOffers,
  getErrReason,
} from '../../reducer/data/selectors.js';

const MAX_IMAGES_OFFER_COUNT = 6;
const MAX_NEARBY_OFFERS_COUNT = 3;

const getActivPlaceCard = (offers, activePlaceId) => {
  return offers.find((place) => place.id === parseInt(activePlaceId, 10));
};

class Property extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {
      match,
      nearbyOffers,
      changeActivPlaceId,
      loadAdditionalData,
    } = this.props;
    if (nearbyOffers.length === 0) {
      loadAdditionalData(match.params.id);
      changeActivPlaceId(match.params.id);
    }
  }

  render() {
    const {
      nearbyOffers,
      offers,
      errReason,
      match,
      onFavoriteBtnClick,
    } = this.props;

    const isOffers = offers.length > 0;

    const placeData = isOffers
      ? getActivPlaceCard(offers, match.params.id)
      : {};
    const {
      isPremium = false,
      images = null,
      price = null,
      isBookmark = false,
      rating = null,
      name = null,
      type = null,
      bedrooms = null,
      maxAdults = null,
      features = null,
      hostName = null,
      hostAvatar = null,
      isHostPro = false,
      description = null,
      id = null,
    } = placeData;

    const offerImages = isOffers
      ? images.slice(0, MAX_IMAGES_OFFER_COUNT)
      : null;
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
        <Header className={HeaderClassNames.OTHER_PAGE} />

        <main className="page__main page__main--property">
          {isOffers ? (
            <React.Fragment>
              <section className="property">
                <div className="property__gallery-container container">
                  <div className="property__gallery">
                    {offerImages.map((image) => {
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
                      <button
                        className={bookmarkClass}
                        type="button"
                        onClick={() => {
                          onFavoriteBtnClick(id, isBookmark);
                        }}>
                        <svg
                          className="property__bookmark-icon"
                          width="31"
                          height="33"
                          style={
                            isBookmark
                              ? {
                                  stroke: `#4481c3`,
                                  fill: `#4481c3`,
                                }
                              : {}
                          }>
                          <use xlinkHref="#icon-bookmark"></use>
                        </svg>
                        <span className="visually-hidden">
                          {bookmarkStatus}
                        </span>
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
                      <h2 className="property__inside-title">
                        What&apos;s inside
                      </h2>
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
                            className="property__avatar user__avatar"
                            src={`/${hostAvatar}`}
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
                  offersByCity={nearbyOffers.slice(0, MAX_NEARBY_OFFERS_COUNT)}
                  currentOffer={placeData}
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
                  {(errReason === ErrReason.LOAD_NEARBY_OFFERS ||
                    errReason === ErrReason.SEND_FAVORITE_OFFER) && (
                    <ErrMessage />
                  )}
                </section>
              </div>
            </React.Fragment>
          ) : (
            <NoPlaces errReason={errReason} />
          )}
        </main>
      </div>
    );
  }
}

Property.propTypes = {
  offers: propTypes.arrayOf(
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

  match: propTypes.shape({
    isExact: propTypes.bool,
    params: propTypes.shape({
      id: propTypes.string.isRequired,
    }),
    path: propTypes.string,
    url: propTypes.string,
  }).isRequired,

  errReason: propTypes.oneOfType([
    propTypes.bool,
    propTypes.oneOf(Object.values(ErrReason)),
  ]),

  loadAdditionalData: propTypes.func.isRequired,
  changeActivPlaceId: propTypes.func.isRequired,
  onFavoriteBtnClick: propTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  offers: getOffers(state),
  nearbyOffers: getNearbyOffers(state),
  errReason: getErrReason(state),
});

const mapDispatchToProps = (dispatch) => ({
  changeActivPlaceId(activePlaceId) {
    dispatch(AppActionCreator.changeActivPlaceId(activePlaceId));
  },
  loadAdditionalData(activePlaceId) {
    dispatch(DataOperation.loadReviews(activePlaceId));
    dispatch(DataOperation.loadNearbyOffers(activePlaceId));
  },
  onFavoriteBtnClick(placeDataId, placeDataIsBookmark) {
    dispatch(DataOperation.sendFavoriteOffer(placeDataId, placeDataIsBookmark));
  },
});

export {Property};
export default connect(mapStateToProps, mapDispatchToProps)(Property);

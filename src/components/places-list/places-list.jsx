import React, {PureComponent} from 'react';
import propTypes from 'prop-types';
import {connect} from 'react-redux';

import {
  PlacesClassNames,
  sortingItems,
  SortingTypeDict,
  // PageType,
} from '../../const.js';

import {Operation as DataOperation} from '../../reducer/data/data.js';
import {ActionCreator as AppActionCreator} from '../../reducer/state-application/state-application.js';
import {getSortingType} from '../../reducer/state-application/selectors.js';
import PlaceCard from '../place-card/place-card.jsx';

class PlaceList extends PureComponent {
  _sortOffersBytype(offers, sortingType) {
    let sortedOffers = offers.slice();
    switch (sortingType) {
      case sortingItems[1]:
        return sortedOffers.sort(
          (a, b) => a[SortingTypeDict.PRICE] - b[SortingTypeDict.PRICE]
        );
      case sortingItems[2]:
        return sortedOffers.sort(
          (a, b) => b[SortingTypeDict.PRICE] - a[SortingTypeDict.PRICE]
        );
      case sortingItems[3]:
        return sortedOffers.sort(
          (a, b) => b[SortingTypeDict.RATING] - a[SortingTypeDict.RATING]
        );
      default:
        return offers;
    }
  }

  render() {
    const {
      offersByCity,
      className,
      sortingType,
      onPlaceCardNameClick,
      onPlaceCardHover,
      onFavoriteBtnClick,
    } = this.props;

    let sortedOffers = offersByCity;

    if (className === PlacesClassNames.MAIN) {
      sortedOffers = this._sortOffersBytype(offersByCity, sortingType);
    }

    return (
      <div className={className[0]}>
        {sortedOffers.map((placeData) => (
          <PlaceCard
            key={placeData.id}
            placeData={placeData}
            className={className[1]}
            onPlaceCardNameClick={onPlaceCardNameClick}
            onPlaceCardHover={onPlaceCardHover}
            onFavoriteBtnClick={onFavoriteBtnClick}
          />
        ))}
      </div>
    );
  }
}

PlaceList.propTypes = {
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

  className: propTypes.oneOf(Object.values(PlacesClassNames)).isRequired,

  sortingType: propTypes.oneOf(sortingItems).isRequired,

  onPlaceCardNameClick: propTypes.func.isRequired,
  onPlaceCardHover: propTypes.func.isRequired,
  onFavoriteBtnClick: propTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  sortingType: getSortingType(state),
});

const mapDispatchToProps = (dispatch) => ({
  onPlaceCardNameClick(placeData) {
    // dispatch(AppActionCreator.changePlace(placeData));
    // dispatch(AppActionCreator.changeActivePage(PageType.PROPERTY));
    // dispatch(DataOperation.loadReviews(placeData.id));
    // dispatch(DataOperation.loadNearbyOffers(placeData.id));
  },
  onPlaceCardHover(placeDataId) {
    dispatch(AppActionCreator.changeHoverCityId(placeDataId));
  },
  onFavoriteBtnClick(placeDataId, placeDataIsBookmark) {
    dispatch(DataOperation.sendFavoriteOffer(placeDataId, placeDataIsBookmark));
  },
});

export {PlaceList};
export default connect(mapStateToProps, mapDispatchToProps)(PlaceList);

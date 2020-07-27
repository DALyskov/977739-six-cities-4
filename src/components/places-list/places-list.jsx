import React, {PureComponent} from 'react';
import propTypes from 'prop-types';
import {connect} from 'react-redux';

import {PlacesClassNames, sotringItems, SortingTypeDict} from '../../const.js';

import {
  ActionCreator as DataActionCreator,
  Operation as DataOperation,
} from '../../reducer/data/data.js';
import {ActionCreator as AppActionCreator} from '../../reducer/state-application/state-application.js';
import {getSotringType} from '../../reducer/state-application/selectors.js';
import PlaceCard from '../place-card/place-card.jsx';

class PlaceList extends PureComponent {
  _sortOffersBytype(offers, sotringType) {
    let sortedOffers = offers.slice();
    switch (sotringType) {
      case sotringItems[1]:
        return sortedOffers.sort(
          (a, b) => a[SortingTypeDict.PRICE] - b[SortingTypeDict.PRICE]
        );
      case sotringItems[2]:
        return sortedOffers.sort(
          (a, b) => b[SortingTypeDict.PRICE] - a[SortingTypeDict.PRICE]
        );
      case sotringItems[3]:
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
      sotringType,
      onPlaceCardNameClick,
      onPlaceCardHover,
    } = this.props;

    const sortedOffers = this._sortOffersBytype(offersByCity, sotringType);

    return (
      <div className={`${className[0]} places__list tabs__content`}>
        {sortedOffers.map((placeData) => (
          <PlaceCard
            key={placeData.id}
            placeData={placeData}
            className={className[1]}
            onPlaceCardNameClick={onPlaceCardNameClick}
            onPlaceCardHover={onPlaceCardHover}
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

  sotringType: propTypes.oneOf(sotringItems).isRequired,

  onPlaceCardNameClick: propTypes.func.isRequired,
  onPlaceCardHover: propTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  sotringType: getSotringType(state),
});

const mapDispatchToProps = (dispatch) => ({
  onPlaceCardNameClick(placeData) {
    dispatch(DataActionCreator.changePlace(placeData));
    dispatch(DataOperation.loadReviews(placeData.id));
    dispatch(DataOperation.loadNearbyOffers(placeData.id));
  },
  onPlaceCardHover(placeDataId) {
    dispatch(AppActionCreator.changeHoverCityId(placeDataId));
  },
});

export {PlaceList};
export default connect(mapStateToProps, mapDispatchToProps)(PlaceList);

import React, {PureComponent} from 'react';
import propTypes from 'prop-types';
import {connect} from 'react-redux';
import {ActionCreator} from '../../reducer.js';

import {
  APPROVED_NAME,
  PlacesClassNames,
  sortingItems,
  SortingTypeDict,
} from '../../const.js';

import PlaceCard from '../place-card/place-card.jsx';

class PlaceList extends PureComponent {
  _sortOffersBytype(offers, sotringType) {
    let sortedOffers = offers.slice();
    switch (sotringType) {
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
      id: propTypes.number.isRequired,
      isPremium: propTypes.bool,
      images: propTypes.arrayOf(propTypes.string.isRequired).isRequired,
      price: propTypes.number.isRequired,
      isBookmark: propTypes.bool,
      rating: propTypes.number.isRequired,
      name: propTypes.oneOf(APPROVED_NAME).isRequired,
      type: propTypes.string.isRequired,
    })
  ).isRequired,

  className: propTypes.oneOf(Object.values(PlacesClassNames)).isRequired,

  onPlaceCardNameClick: propTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  onPlaceCardNameClick(placeData) {
    dispatch(ActionCreator.changePlace(placeData));
  },
  onPlaceCardHover(placeDataId) {
    dispatch(ActionCreator.changeHoverCityId(placeDataId));
  },
});

export {PlaceList};
export default connect(null, mapDispatchToProps)(PlaceList);

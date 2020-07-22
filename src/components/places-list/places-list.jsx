import React, {PureComponent} from 'react';
import propTypes from 'prop-types';
import {connect} from 'react-redux';
import {ActionCreator} from '../../reducer.js';

import {APPROVED_NAME, PlacesClassNames} from '../../const.js';

import PlaceCard from '../place-card/place-card.jsx';

class PlaceList extends PureComponent {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     activPlaceCardId: null,
  //     activPlaceCard: {},
  //   };

  //   this.handlePlaceCardHover = this.handlePlaceCardHover.bind(this);
  // }

  // handlePlaceCardHover(placeData) {
  //   if (placeData !== this.state.activPlaceCard) {
  //     this.setState({activPlaceCard: placeData});
  //   }
  // }

  render() {
    const {offersByCity, className, onPlaceCardNameClick} = this.props;
    return (
      <div className={`${className[0]} places__list tabs__content`}>
        {offersByCity.map((placeData) => (
          <PlaceCard
            key={placeData.id}
            placeData={placeData}
            className={className[1]}
            onPlaceCardNameClick={onPlaceCardNameClick}
            // onPlaceCardHover={this.handlePlaceCardHover}
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
});

export {PlaceList};
export default connect(null, mapDispatchToProps)(PlaceList);

import React, {PureComponent} from 'react';
import propTypes from 'prop-types';

import {APPROVED_NAME} from '../../const.js';

import PlaceCard from '../place-card/place-card.jsx';

export default class PlaceList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activPlaceCardId: null,
      activPlaceCard: {},
    };

    this.handlePlaceCardHover = this.handlePlaceCardHover.bind(this);
    this.handlePlaceCardNameClick = this.handlePlaceCardNameClick.bind(this);
  }

  handlePlaceCardHover(placeData) {
    if (placeData !== this.state.activPlaceCard) {
      this.setState({activPlaceCard: placeData});
    }
  }

  handlePlaceCardNameClick(evt) {
    evt.preventDefault();
    const placeId = evt.target.dataset.id;
    if (placeId !== this.setState.activPlaceCardId) {
      this.setState({activPlaceCardId: placeId});
    }
  }

  render() {
    const {offers} = this.props;
    return (
      <div className="cities__places-list places__list tabs__content">
        {offers.map((place) => (
          <PlaceCard
            key={place.id}
            place={place}
            onPlaceCardNameClick={this.handlePlaceCardNameClick}
            onPlaceCardHover={this.handlePlaceCardHover}
          />
        ))}
      </div>
    );
  }
}

PlaceList.propTypes = {
  offers: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.number.isRequired,
      isPremium: propTypes.bool,
      image: propTypes.string.isRequired,
      price: propTypes.number.isRequired,
      isBookmark: propTypes.bool,
      starsValue: propTypes.number.isRequired,
      name: propTypes.oneOf(APPROVED_NAME).isRequired,
      type: propTypes.string.isRequired,
    })
  ).isRequired,
};

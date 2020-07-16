import React, {PureComponent} from 'react';
import propTypes from 'prop-types';
import {Switch, Route, BrowserRouter} from 'react-router-dom';

import {APPROVED_NAME} from '../../const.js';

import Main from '../main/main.jsx';
import Property from '../property/property.jsx';

export default class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activPlaceCardId: null,
      activPlaceCard: null,
    };
    this.handlePlaceCardNameClick = this.handlePlaceCardNameClick.bind(this);
  }

  handlePlaceCardNameClick(placeData) {
    this.setState({activPlaceCard: placeData});
  }

  _renderMain() {
    const {offers, reviews} = this.props;
    const {activPlaceCard} = this.state;

    if (activPlaceCard === null) {
      return (
        <Main
          offers={offers}
          onPlaceCardNameClick={this.handlePlaceCardNameClick}
        />
      );
    } else {
      return (
        // DRY
        // <Property
        //   placeData={activPlaceCard}
        //   reviews={reviews}
        //   offers={offers.slice(0, 3)}
        //   onPlaceCardNameClick={this.handlePlaceCardNameClick}
        // />

        this._renderProperty(activPlaceCard)
      );
    }
  }

  _renderProperty(placeData) {
    const {offers, reviews} = this.props;
    if (offers.length > 0) {
      return (
        <Property
          placeData={placeData}
          reviews={reviews}
          offers={offers.slice(0, 3)}
          onPlaceCardNameClick={this.handlePlaceCardNameClick}
        />
      );
    }
    return <h1>no data</h1>;
  }

  // _renderProperty() {
  //   const {offers, reviews} = this.props;
  //   if (offers.length > 0) {
  //     return (
  //       <Property
  //         placeData={offers[0]}
  //         reviews={reviews}
  //         offers={offers.slice(0, 3)}
  //         onPlaceCardNameClick={this.handlePlaceCardNameClick}
  //       />
  //     );
  //   }
  //   return <h1>no data</h1>;
  // }

  render() {
    const {offers} = this.props;
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderMain()}
          </Route>
          <Route exact path="/dev-component">
            {this._renderProperty(offers[0])}
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  offers: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.number.isRequired,
      isPremium: propTypes.bool,
      images: propTypes.arrayOf(propTypes.string.isRequired).isRequired,
      price: propTypes.number.isRequired,
      isBookmark: propTypes.bool,
      rating: propTypes.number.isRequired,
      name: propTypes.oneOf(APPROVED_NAME).isRequired,
      type: propTypes.string.isRequired,
      bedrooms: propTypes.number.isRequired,
      maxAdults: propTypes.number.isRequired,
      features: propTypes.arrayOf(propTypes.string.isRequired),
      hostName: propTypes.string.isRequired,
      hostAvatar: propTypes.string.isRequired,
      isHostPro: propTypes.bool,
      description: propTypes.string.isRequired,
    })
  ).isRequired,

  reviews: propTypes.arrayOf(
    propTypes.shape({
      comment: propTypes.string.isRequired,
      date: propTypes.object.isRequired,
      id: propTypes.number.isRequired,
      rating: propTypes.number.isRequired,
      userAvatar: propTypes.string.isRequired,
      userName: propTypes.string.isRequired,
    })
  ).isRequired,
};

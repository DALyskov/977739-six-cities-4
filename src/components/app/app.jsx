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
    const {offers} = this.props;
    const {activPlaceCard} = this.state;

    if (activPlaceCard === null) {
      return (
        <Main
          offers={offers}
          onPlaceCardNameClick={this.handlePlaceCardNameClick}
        />
      );
    } else {
      return <Property placeData={activPlaceCard} />;
    }
  }

  _renderProperty() {
    const {offers} = this.props;
    if (offers.length > 0) {
      return <Property placeData={offers[0]} />;
    }
    return <h1>no data</h1>;
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderMain()}
          </Route>
          <Route exact path="/dev-component">
            {this._renderProperty()}
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
};

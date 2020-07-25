import React, {PureComponent} from 'react';
import propTypes from 'prop-types';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import {APPROVED_NAME} from '../../const.js';

import Main from '../main/main.jsx';
import Property from '../property/property.jsx';

class App extends PureComponent {
  _renderMain() {
    const {offers, offersByCity, activPlaceCard, activeCity} = this.props;

    if (!activPlaceCard) {
      return (
        <Main
          offers={offers}
          offersByCity={offersByCity}
          activeCity={activeCity}
        />
      );
    } else {
      return this._renderProperty(activPlaceCard);
    }
  }

  _renderProperty(placeData = false) {
    const {offersByCity} = this.props;
    return (
      <Property placeData={placeData} offersByCity={offersByCity.slice(0, 3)} />
    );
  }

  render() {
    const {offersByCity} = this.props;
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderMain()}
          </Route>
          <Route exact path="/dev-component">
            {this._renderProperty(offersByCity[0])}
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
      bedrooms: propTypes.number.isRequired,
      maxAdults: propTypes.number.isRequired,
      features: propTypes.arrayOf(propTypes.string.isRequired),
      hostName: propTypes.string.isRequired,
      hostAvatar: propTypes.string.isRequired,
      isHostPro: propTypes.bool,
      description: propTypes.string.isRequired,
    })
  ).isRequired,

  activPlaceCard: propTypes.oneOfType([
    propTypes.shape({
      id: propTypes.number.isRequired,
      isPremium: propTypes.bool,
      images: propTypes.arrayOf(propTypes.string.isRequired).isRequired,
      price: propTypes.number.isRequired,
      isBookmark: propTypes.bool,
      rating: propTypes.number.isRequired,
      name: propTypes.oneOf(APPROVED_NAME).isRequired,
      type: propTypes.string.isRequired,
    }),
    propTypes.bool,
  ]).isRequired,

  activeCity: propTypes.oneOfType([propTypes.string, propTypes.bool]),
};

const mapStateToProps = (state) => ({
  offers: state.offers,
  offersByCity: state.offersByCity,
  activPlaceCard: state.activPlaceCard,
  activeCity: state.activeCity,
});

export {App};
export default connect(mapStateToProps)(App);

import React, {PureComponent} from 'react';
import propTypes from 'prop-types';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {ActionCreater} from '../../reducer.js';

import {APPROVED_NAME} from '../../const.js';

import Main from '../main/main.jsx';
import Property from '../property/property.jsx';

class App extends PureComponent {
  _renderMain() {
    const {
      offersByCity,
      activPlaceCard,
      activeCity,
      // onPlaceCardNameClick,
    } = this.props;

    // console.log(offersByCity);

    if (activPlaceCard === null) {
      return (
        <Main
          offers={offersByCity}
          activeCity={activeCity}
          // onPlaceCardNameClick={onPlaceCardNameClick}
        />
      );
    } else {
      return this._renderProperty(activPlaceCard);
    }
  }

  _renderProperty(placeData) {
    const {offersByCity, reviews, onPlaceCardNameClick} = this.props;
    // неверное условие
    if (offersByCity.length > 0) {
      return (
        <Property
          placeData={placeData}
          reviews={reviews}
          offers={offersByCity.slice(0, 3)}
          // onPlaceCardNameClick={onPlaceCardNameClick}
        />
      );
    }
    return <h1>no data</h1>;
  }

  _getOffersByCity() {
    return this.props.offers.filter(
      (offer) => offer.city.name === this.props.activeCity
    );
  }

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

  // activPlaceCard: propTypes.shape({
  //   id: propTypes.number.isRequired,
  //   isPremium: propTypes.bool,
  //   images: propTypes.arrayOf(propTypes.string.isRequired).isRequired,
  //   price: propTypes.number.isRequired,
  //   isBookmark: propTypes.bool,
  //   rating: propTypes.number.isRequired,
  //   name: propTypes.oneOf(APPROVED_NAME).isRequired,
  //   type: propTypes.string.isRequired,
  // }).isRequired,

  // onPlaceCardNameClick: propTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  offers: state.offers,
  offersByCity: state.offersByCity,
  activPlaceCard: state.activPlaceCard,
  reviews: state.reviews,
  activeCity: state.activeCity,
});
const mapDispatchToProps = (dispatch) => ({
  // onPlaceCardNameClick(placeData) {
  //   dispatch(ActionCreater.changePlace(placeData));
  // },
  onGetOffersByCity(activeCity) {
    dispatch(ActionCreater.getOffers(activeCity));
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);

import React, {PureComponent} from 'react';
import propTypes from 'prop-types';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {ActionCreater} from '../../reducer.js';

import {APPROVED_NAME} from '../../const.js';

import Main from '../main/main.jsx';
import Property from '../property/property.jsx';

class App extends PureComponent {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     // activPlaceCardId: null,
  //     activPlaceCard: null,
  //   };
  //   this.handlePlaceCardNameClick = this.handlePlaceCardNameClick.bind(this);
  // }

  // handlePlaceCardNameClick(placeData) {
  //   this.setState({activPlaceCard: placeData});
  // }

  _renderMain() {
    const {activPlaceCard, activeCity, onPlaceCardNameClick} = this.props;
    // const {activPlaceCard} = this.state;

    const offers = this._getOffersByCity(activeCity);

    if (activPlaceCard === null) {
      return (
        <Main
          offers={offers}
          activeCity={activeCity}
          // onPlaceCardNameClick={this.handlePlaceCardNameClick}
          onPlaceCardNameClick={onPlaceCardNameClick}
        />
      );
    } else {
      return this._renderProperty(activPlaceCard);
    }
  }

  _renderProperty(placeData) {
    const {reviews, onPlaceCardNameClick} = this.props;
    const offers = this._getOffersByCity(placeData.city.name);
    if (offers.length > 0) {
      return (
        <Property
          placeData={placeData}
          reviews={reviews}
          offers={offers.slice(0, 3)}
          // onPlaceCardNameClick={this.handlePlaceCardNameClick}
          onPlaceCardNameClick={onPlaceCardNameClick}
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

  onPlaceCardNameClick: propTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  offers: state.offers,
  activPlaceCard: state.activPlaceCard,
  reviews: state.reviews,
  activeCity: state.activeCity,
});
const mapDispatchToProps = (dispatch) => ({
  onPlaceCardNameClick(placeData) {
    dispatch(ActionCreater.changePlace(placeData));
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);

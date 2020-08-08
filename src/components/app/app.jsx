import React, {PureComponent} from 'react';
import propTypes from 'prop-types';
import {Route, Switch, Redirect, Router} from 'react-router-dom';
import {connect} from 'react-redux';

import {AuthorizationStatus, PageType, AppRoute} from '../../const.js';

import history from '../../history.js';
import Main from '../main/main.jsx';
import Property from '../property/property.jsx';
import SignIn from '../sign-in/sign-in.jsx';
import Favorite from '../favorite/favorite.jsx';
import {
  getNearbyOffers,
  getFavoriteOffers,
  getOffers,
} from '../../reducer/data/selectors.js';
import {
  getActiveCity,
  getActivePage,
  getActivPlaceCard,
  getOffersByCity,
  getFavoriteCities,
} from '../../reducer/state-application/selectors.js';
import {Operation as UserOperation} from '../../reducer/user/user.js';
import {getAuthorizationStatus} from '../../reducer/user/selectors.js';

class App extends PureComponent {
  render() {
    const {
      // offers,
      offersByCity,
      activeCity,
      activPlaceCard,
      nearbyOffers,
      authorizationStatus,
      // favoriteOffers,
      favoriteCities,
      onSignInBtnClick,
    } = this.props;
    const isLoggedIn = authorizationStatus === AuthorizationStatus.AUTH;
    return (
      <Router history={history}>
        <Switch>
          <Route exact path={AppRoute.MAIN}>
            <Main />
          </Route>
          <Route
            exact
            path={`${AppRoute.PROPERTY}/:id`}
            render={(props) => {
              return <Property {...props} />;
            }}
          />
          <Route exact path={AppRoute.SING_IN}>
            {isLoggedIn && <Redirect to={AppRoute.MAIN} />}
            <SignIn
            // activeCity={activeCity}
            // authorizationStatus={authorizationStatus}
            // onSignInBtnClick={onSignInBtnClick}
            />
          </Route>
          <Route exact path={AppRoute.FAVORITES}>
            {!isLoggedIn && <Redirect to={AppRoute.SING_IN} />}
            <Favorite />
          </Route>
        </Switch>
      </Router>
    );
  }
}

App.propTypes = {
  nearbyOffers: propTypes.arrayOf(
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

  activPlaceCard: propTypes.oneOfType([
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
    }),
    propTypes.bool,
  ]).isRequired,

  activeCity: propTypes.oneOfType([propTypes.string, propTypes.bool])
    .isRequired,
  activePage: propTypes.oneOf(Object.values(PageType)).isRequired,
  authorizationStatus: propTypes.oneOf(Object.values(AuthorizationStatus))
    .isRequired,

  onSignInBtnClick: propTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  activeCity: getActiveCity(state),
  // offers: getOffers(state),
  offersByCity: getOffersByCity(state),
  // activPlaceCard: getActivPlaceCard(state),
  nearbyOffers: getNearbyOffers(state),
  activePage: getActivePage(state),
  authorizationStatus: getAuthorizationStatus(state),
  // favoriteOffers: getFavoriteOffers(state),
  favoriteCities: getFavoriteCities(state),
});

const mapDispatchToProps = (dispatch) => ({
  onSignInBtnClick(authData) {
    dispatch(UserOperation.login(authData));
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);

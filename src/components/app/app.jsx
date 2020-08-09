import React, {PureComponent} from 'react';
import propTypes from 'prop-types';
import {Route, Switch, Redirect, Router} from 'react-router-dom';
import {connect} from 'react-redux';

import {AuthorizationStatus, AppRoute} from '../../const.js';

import history from '../../history.js';
import Main from '../main/main.jsx';
import Property from '../property/property.jsx';
import SignIn from '../sign-in/sign-in.jsx';
import Favorite from '../favorite/favorite.jsx';
import {getAuthorizationStatus} from '../../reducer/user/selectors.js';

class App extends PureComponent {
  render() {
    const {authorizationStatus} = this.props;
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
            <SignIn />
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
  authorizationStatus: propTypes.oneOf(Object.values(AuthorizationStatus))
    .isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
});

export {App};
export default connect(mapStateToProps)(App);

import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';
import configureStore from 'redux-mock-store';

import {AuthorizationStatus, ErrReason} from '../../const.js';
import {cities} from '../../mocks-test/cities.js';
import NameSpace from '../../reducer/name-space.js';

import history from '../../history.js';
import SignIn from './sign-in.jsx';

const mockStore = configureStore([]);

describe(`SignIn_snapchots`, () => {
  const store = mockStore({
    [NameSpace.DATA]: {
      errMessage: `Error`,
      errReason: false,
    },
    [NameSpace.STATE_APPLICATION]: {},
    [NameSpace.USER]: {
      authorizationStatus: AuthorizationStatus.NO_AUTH,
      userEmail: false,
    },
  });
  it(`SignIn_snapchots_should_rendered_correctly`, () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <Router history={history}>
            <SignIn
              activeCity={cities[0]}
              errReason={ErrReason.SEND_FAVORITE_OFFER}
              onSignInBtnClick={() => {}}
            />
          </Router>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it(`SignIn_snapchots_should_rendered_correctly_without_Err`, () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <Router history={history}>
            <SignIn
              activeCity={cities[0]}
              errReason={false}
              onSignInBtnClick={() => {}}
            />
          </Router>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

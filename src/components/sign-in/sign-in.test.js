import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';

import {PageType, AuthorizationStatus} from '../../const.js';
import {cities} from '../../mocks-test/cities.js';
import NameSpace from '../../reducer/name-space.js';

import SignIn from './sign-in.jsx';

const mockStore = configureStore([]);

describe(`SignIn_snapchots`, () => {
  const store = mockStore({
    [NameSpace.STATE_APPLICATION]: {
      activePage: PageType.MAIN,
    },
    [NameSpace.USER]: {
      authorizationStatus: AuthorizationStatus.NO_AUTH,
      userEmail: false,
    },
  });
  it(`SignIn_snapchots_should_rendered_correctly`, () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <SignIn activeCity={cities[0]} onSignInBtnClick={() => {}} />
        </Provider> /* ,{
        createNodeMock: () => {
          return document.createElement(`div`);
        },
      } */
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

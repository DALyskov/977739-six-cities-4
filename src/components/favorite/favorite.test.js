import React from 'react';
import renderer from 'react-test-renderer';
import {Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';

import {offers} from '../../mocks-test/offers.js';
import {SORTING_ITEMS, AuthorizationStatus} from '../../const.js';
import NameSpace from '../../reducer/name-space.js';

import history from '../../history.js';
import {Favorite} from './favorite.jsx';

const mockStore = configureStore([]);

describe(`Favorite_snapchots`, () => {
  const store = mockStore({
    [NameSpace.DATA]: {
      favoriteOffers: offers,
      errReason: false,
    },
    [NameSpace.STATE_APPLICATION]: {
      sortingType: SORTING_ITEMS[0],
    },
    [NameSpace.USER]: {
      authorizationStatus: AuthorizationStatus.AUTH,
      userEmail: `A@mail.ru`,
    },
  });
  it(`Favorite_with_data`, () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <Router history={history}>
            <Favorite
              favoriteCities={[
                ...new Set(offers.map((place) => place.city.name)),
              ]}
              errReason={false}
              loadAdditionalData={() => {}}
            />
          </Router>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

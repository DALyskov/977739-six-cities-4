import React from 'react';
import renderer from 'react-test-renderer';
import {Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';

import {offers} from '../../mocks-test/offers.js';
import {SORTING_ITEMS} from '../../const.js';

import history from '../../history.js';
import FavoriteItem from './favorite-item.jsx';
import NameSpace from '../../reducer/name-space.js';

const mockStore = configureStore([]);

describe(`FavoriteItem_snapchots`, () => {
  const store = mockStore({
    [NameSpace.DATA]: {
      favoriteOffers: offers,
    },
    [NameSpace.STATE_APPLICATION]: {
      sortingType: SORTING_ITEMS[0],
    },
    [NameSpace.USER]: {},
  });
  it(`FavoriteItem_with_data`, () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <Router history={history}>
            <FavoriteItem
              favoriteOffers={offers}
              favoriteCity={offers[0].city.name}
              onCityClick={() => {}}
            />
          </Router>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

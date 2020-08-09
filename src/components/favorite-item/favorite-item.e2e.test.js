import React from 'react';
import {Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';

import {SORTING_ITEMS} from '../../const.js';
import {offers} from '../../mocks-test/offers.js';
import NameSpace from '../../reducer/name-space.js';

import history from '../../history.js';
import {FavoriteItem} from './favorite-item.jsx';

Enzyme.configure({
  adapter: new Adapter(),
});

const mockStore = configureStore([]);

describe(`FavoriteItem_ee`, () => {
  const store = mockStore({
    [NameSpace.DATA]: {
      favoriteOffers: offers,
    },
    [NameSpace.STATE_APPLICATION]: {
      sortingType: SORTING_ITEMS[0],
    },
    [NameSpace.USER]: {},
  });

  const onCityClick = jest.fn();

  it(`FavoriteItem_on_click`, () => {
    const favoriteItem = mount(
      <Provider store={store}>
        <Router history={history}>
          <FavoriteItem
            favoriteOffers={offers}
            favoriteCity={offers[0].city.name}
            onCityClick={onCityClick}
          />
        </Router>
      </Provider>
    );

    const favoriteLink = favoriteItem.find(`.locations__item-link`).at(1);

    favoriteLink.simulate(`click`, {});

    expect(onCityClick).toHaveBeenCalledTimes(1);
  });
});

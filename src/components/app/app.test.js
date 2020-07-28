import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';

import {sortingItems} from '../../const.js';
import NameSpace from '../../reducer/name-space.js';
import {offers} from '../../mocks-test/offers.js';
import {reviews} from '../../mocks-test/reviews.js';
import {cities} from '../../mocks-test/cities.js';

import App from './app.jsx';

const mockStore = configureStore([]);

describe(`App_snapchots`, () => {
  it(`App_whith_main_with_data`, () => {
    const store = mockStore({
      [NameSpace.DATA]: {
        offers,
        nearbyOffers: offers.slice(0, 3),
        reviews,
      },
      [NameSpace.STATE_APPLICATION]: {
        cities,
        activeCity: cities[0],
        sortingType: sortingItems[0],
        hoverCityId: false,
        activPlaceCard: false,
      },
    });
    const tree = renderer
      .create(
        <Provider store={store}>
          <App />
        </Provider>,
        {
          createNodeMock: () => {
            return document.createElement(`div`);
          },
        }
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it(`App_whith_main_without_data`, () => {
    const store = mockStore({
      [NameSpace.DATA]: {
        offers: [],
        nearbyOffers: [],
        reviews,
      },
      [NameSpace.STATE_APPLICATION]: {
        cities,
        activeCity: false,
        sortingType: sortingItems[0],
        hoverCityId: false,
        activPlaceCard: false,
      },
    });
    const tree = renderer
      .create(
        <Provider store={store}>
          <App />
        </Provider>,
        {
          createNodeMock: () => {
            return document.createElement(`div`);
          },
        }
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it(`App_whith_property`, () => {
    const store = mockStore({
      [NameSpace.DATA]: {
        offers,
        nearbyOffers: offers.slice(0, 3),
        reviews,
      },
      [NameSpace.STATE_APPLICATION]: {
        cities,
        activeCity: cities[0],
        sortingType: sortingItems[0],
        hoverCityId: false,
        activPlaceCard: offers[0],
      },
    });
    const tree = renderer
      .create(
        <Provider store={store}>
          <App />
        </Provider>,
        {
          createNodeMock: () => {
            return document.createElement(`div`);
          },
        }
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

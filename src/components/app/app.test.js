import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';

import {AuthorizationStatus, SORTING_ITEMS} from '../../const.js';
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
        errReason: false,
      },
      [NameSpace.STATE_APPLICATION]: {
        cities,
        activeCity: cities[0],
        sortingType: SORTING_ITEMS[0],
        hoverCityId: false,
        activPlaceCard: false,
      },
      [NameSpace.USER]: {
        authorizationStatus: AuthorizationStatus.NO_AUTH,
        userEmail: false,
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
        errReason: false,
      },
      [NameSpace.STATE_APPLICATION]: {
        cities,
        activeCity: false,
        sortingType: SORTING_ITEMS[0],
        hoverCityId: false,
        activPlaceCard: false,
      },
      [NameSpace.USER]: {
        authorizationStatus: AuthorizationStatus.NO_AUTH,
        userEmail: false,
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

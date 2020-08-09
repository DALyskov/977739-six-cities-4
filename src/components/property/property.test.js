import React from 'react';
import renderer from 'react-test-renderer';
import {Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';

import {SORTING_ITEMS, AuthorizationStatus} from '../../const.js';
import NameSpace from '../../reducer/name-space.js';
import {offers} from '../../mocks-test/offers.js';
import {reviews} from '../../mocks-test/reviews.js';

import history from '../../history.js';
import Property from './property.jsx';

const mockStore = configureStore([]);

describe(`Property_snapchots`, () => {
  it(`Property_with_data`, () => {
    const store = mockStore({
      [NameSpace.DATA]: {
        offers,
        reviews,
        nearbyOffers: offers.slice(0, 3),
        errReason: false,
      },
      [NameSpace.STATE_APPLICATION]: {
        sortingType: SORTING_ITEMS[0],
        hoverCityId: false,
        activPlaceId: `1`,
      },
      [NameSpace.USER]: {
        authorizationStatus: AuthorizationStatus.AUTH,
        userEmail: `A@mail.ru`,
      },
    });
    const tree = renderer
      .create(
        <Provider store={store}>
          <Router history={history}>
            <Property
              offers={offers}
              nearbyOffers={offers.slice(0, 3)}
              match={{params: {id: `1`}}}
            />
          </Router>
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

  it(`Property_without_data`, () => {
    const store = mockStore({
      [NameSpace.DATA]: {
        offers,
        reviews: [],
        nearbyOffers: offers.slice(0, 3),
        errReason: false,
      },
      [NameSpace.STATE_APPLICATION]: {
        sortingType: SORTING_ITEMS[0],
        hoverCityId: false,
        activPlaceId: `1`,
      },
      [NameSpace.USER]: {
        authorizationStatus: AuthorizationStatus.NO_AUTH,
        userEmail: `A@mail.ru`,
      },
    });
    const tree = renderer
      .create(
        <Provider store={store}>
          <Router history={history}>
            <Property
              offers={offers}
              nearbyOffers={offers.slice(0, 3)}
              match={{params: {id: `1`}}}
            />
          </Router>
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

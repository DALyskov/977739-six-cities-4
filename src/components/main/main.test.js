import React from 'react';
import renderer from 'react-test-renderer';
import {Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';

import {SORTING_ITEMS, AuthorizationStatus, ErrReason} from '../../const.js';
import NameSpace from '../../reducer/name-space.js';
import {offers} from '../../mocks-test/offers.js';
import {cities} from '../../mocks-test/cities.js';

import history from '../../history.js';
import Main from './main.jsx';

const mockStore = configureStore([]);

describe(`Main_snapchots`, () => {
  const store = mockStore({
    [NameSpace.DATA]: {
      offers,
      errReason: false,
    },
    [NameSpace.STATE_APPLICATION]: {
      cities,
      activeCity: cities[0],
      sortingType: SORTING_ITEMS[0],
      hoverCityId: false,
      activPlaceId: ``,
    },
    [NameSpace.USER]: {
      authorizationStatus: AuthorizationStatus.NO_AUTH,
      userEmail: false,
    },
  });
  it(`Main_with_data`, () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <Router history={history}>
            <Main
              offersByCity={offers}
              activeCity={offers[0].city.name}
              errReason={ErrReason.SEND_FAVORITE_OFFER}
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

  it(`Main_without_data`, () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <Router history={history}>
            <Main
              offers={[]}
              offersByCity={[]}
              activeCity={false}
              errReason={ErrReason.SEND_FAVORITE_OFFER}
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

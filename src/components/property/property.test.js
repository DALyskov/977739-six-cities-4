import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';

import {sortingItems, PageType, AuthorizationStatus} from '../../const.js';
import NameSpace from '../../reducer/name-space.js';
import {offers} from '../../mocks-test/offers.js';
import {reviews} from '../../mocks-test/reviews.js';

import Property from './property.jsx';

const mockStore = configureStore([]);
const placeData = offers[0];

describe(`Property_snapchots`, () => {
  it(`with_data`, () => {
    const store = mockStore({
      [NameSpace.DATA]: {
        reviews,
      },
      [NameSpace.STATE_APPLICATION]: {
        sortingType: sortingItems[0],
        hoverCityId: false,
        activePage: PageType.PROPERTY,
      },
      [NameSpace.USER]: {
        authorizationStatus: AuthorizationStatus.NO_AUTH,
        userEmail: false,
      },
    });
    const tree = renderer
      .create(
        <Provider store={store}>
          <Property placeData={placeData} nearbyOffers={offers.slice(0, 3)} />
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

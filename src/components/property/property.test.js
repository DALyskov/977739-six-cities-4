import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';

import {sotringItems} from '../../const.js';
import {offers, incompletePlace, reviews} from '../../mocks/mocks-test.js';

import Property from './property.jsx';

const mockStore = configureStore([]);
const placeData = offers[0];
const incompletePlaceData = incompletePlace;

describe(`Property_snapchots`, () => {
  it(`with_data`, () => {
    const store = mockStore({
      reviews,
      sotringType: sotringItems[0],
      hoverCityId: false,
    });
    const tree = renderer
      .create(
        <Provider store={store}>
          <Property placeData={placeData} offersByCity={offers.slice(0, 3)} />
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

  it(`incomplete_data`, () => {
    const store = mockStore({
      reviews: [],
      sotringType: sotringItems[0],
      hoverCityId: false,
    });
    const tree = renderer
      .create(
        <Provider store={store}>
          <Property
            placeData={incompletePlaceData}
            offersByCity={offers.slice(0, 3)}
          />
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

import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';

import {offers, reviews, cities} from '../../mocks/mocks-test.js';
import {sotringItems} from '../../const.js';
import App from './app.jsx';

const mockStore = configureStore([]);

describe(`App_snapchots`, () => {
  it(`App_whith_main_with_data`, () => {
    const store = mockStore({
      offers,
      activeCity: cities[0],
      offersByCity: offers.slice(0, 3),
      activPlaceCard: false,
      reviews,
      cities,
      sotringType: sotringItems[0],
      hoverCityId: false,
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
      offers: [],
      activeCity: false,
      offersByCity: [],
      activPlaceCard: false,
      reviews,
      cities,
      sotringType: sotringItems[0],
      hoverCityId: false,
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
      offers,
      activeCity: cities[0],
      offersByCity: offers.slice(0, 3),
      activPlaceCard: offers[0],
      reviews,
      cities,
      sotringType: sotringItems[0],
      hoverCityId: false,
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

import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';

import {sortingItems} from '../../const.js';
import NameSpace from '../../reducer/name-space.js';
import {offers} from '../../mocks-test/offers.js';
import {cities} from '../../mocks-test/cities.js';

import Main from './main.jsx';

const mockStore = configureStore([]);

describe(`Main_snapchots`, () => {
  const store = mockStore({
    [NameSpace.DATA]: {
      offers,
    },
    [NameSpace.STATE_APPLICATION]: {
      cities,
      activeCity: cities[0],
      sortingType: sortingItems[0],
      hoverCityId: false,
    },
  });
  it(`with_data`, () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <Main offersByCity={offers} activeCity={offers[0].city.name} />
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

  it(`without_data`, () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <Main offers={[]} offersByCity={[]} activeCity={false} />
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

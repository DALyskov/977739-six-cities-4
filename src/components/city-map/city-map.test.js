import React from 'react';
import renderer from 'react-test-renderer';

import {offers as offersData} from '../../mocks/mocks-test.js';

import CityMap from './city-map.jsx';

const offers = offersData;

describe(`CityMap_snapchots`, () => {
  it(`with_data`, () => {
    const tree = renderer
      .create(<CityMap offers={offers} city={`Amsterdam`} />, {
        createNodeMock: () => {
          return document.createElement(`div`);
        },
      })
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it(`without_data`, () => {
    const tree = renderer
      .create(<CityMap offers={[]} city={`Amsterdam`} />, {
        createNodeMock: () => {
          return document.createElement(`div`);
        },
      })
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

import React from 'react';
import renderer from 'react-test-renderer';

import {MapClassName} from '../../const.js';
import {offers} from '../../mocks-test/offers.js';

import {CityMap} from './city-map.jsx';

describe(`CityMap_snapchots`, () => {
  it(`with_data`, () => {
    const tree = renderer
      .create(
        <CityMap
          offersByCity={offers}
          currentOffer={false}
          className={MapClassName.MAIN}
          hoverCityId={1}
        />,
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

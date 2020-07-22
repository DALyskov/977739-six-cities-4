import React from 'react';
import renderer from 'react-test-renderer';

import {cities} from '../../mocks/mocks-test.js';

import {CitiesList} from './cities-list.jsx';

describe(`CitiesList_snapchots`, () => {
  it(`with_data`, () => {
    const tree = renderer
      .create(
        <CitiesList
          cities={cities}
          activeCity={cities[0]}
          onCityClick={() => {}}
          onGetOffersByCity={() => {}}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

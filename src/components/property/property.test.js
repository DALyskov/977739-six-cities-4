import React from 'react';
import renderer from 'react-test-renderer';

import {offers, incompletePlace} from '../../mocks/mocks-test.js';

import Property from './property.jsx';

const placeData = offers[0];
const incompletePlaceData = incompletePlace;

describe(`Property_snapchots`, () => {
  it(`with_data`, () => {
    const tree = renderer.create(<Property placeData={placeData} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it(`incomplete_data`, () => {
    const tree = renderer
      .create(<Property placeData={incompletePlaceData} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

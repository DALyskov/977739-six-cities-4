import React from 'react';
import renderer from 'react-test-renderer';

import {offers, incompletePlace, reviews} from '../../mocks/mocks-test.js';

import Property from './property.jsx';

const placeData = offers[0];
const incompletePlaceData = incompletePlace;

describe(`Property_snapchots`, () => {
  it(`with_data`, () => {
    const tree = renderer
      .create(
        <Property
          placeData={placeData}
          reviews={reviews}
          offers={offers.slice(0, 3)}
          onPlaceCardNameClick={() => {}}
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

  it(`incomplete_data`, () => {
    const tree = renderer
      .create(
        <Property
          placeData={incompletePlaceData}
          reviews={[]}
          offers={offers.slice(0, 3)}
          onPlaceCardNameClick={() => {}}
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

import React from 'react';
import renderer from 'react-test-renderer';

import {PlacesClassNames} from '../../const.js';
import {offers} from '../../mocks-test/offers.js';

import PlaceCard from './place-card.jsx';

const placeData = offers[0];

describe(`PlaceCard_snapchots`, () => {
  it(`with_data`, () => {
    const tree = renderer
      .create(
        <PlaceCard
          placeData={placeData}
          className={PlacesClassNames.MAIN[1]}
          onPlaceCardNameClick={() => {}}
          onPlaceCardHover={() => {}}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

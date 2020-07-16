import React from 'react';
import renderer from 'react-test-renderer';

import {PlacesClassNames} from '../../const.js';
import {offers, incompletePlace} from '../../mocks/mocks-test.js';

import PlaceCard from './place-card.jsx';

const placeData = offers[0];
const incompletePlaceData = incompletePlace;

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

  it(`incomplete_data`, () => {
    const tree = renderer
      .create(
        <PlaceCard
          placeData={incompletePlaceData}
          className={PlacesClassNames.MAIN[1]}
          onPlaceCardNameClick={() => {}}
          onPlaceCardHover={() => {}}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

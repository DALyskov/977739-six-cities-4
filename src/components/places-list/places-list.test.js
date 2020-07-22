import React from 'react';
import renderer from 'react-test-renderer';

import {PlacesClassNames} from '../../const.js';
import {offers, incompletePlace} from '../../mocks/mocks-test.js';

import {PlaceList} from './places-list.jsx';

const incompleteOffers = [incompletePlace];

describe(`PlaceList_snapchots`, () => {
  it(`with_data`, () => {
    const tree = renderer
      .create(
        <PlaceList
          offersByCity={offers}
          className={PlacesClassNames.MAIN}
          onPlaceCardNameClick={() => {}}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it(`without_data`, () => {
    const tree = renderer
      .create(
        <PlaceList
          offersByCity={[]}
          className={PlacesClassNames.MAIN}
          onPlaceCardNameClick={() => {}}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it(`incomplete data`, () => {
    const tree = renderer
      .create(
        <PlaceList
          offersByCity={incompleteOffers}
          className={PlacesClassNames.MAIN}
          onPlaceCardNameClick={() => {}}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

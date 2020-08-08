import React from 'react';
import renderer from 'react-test-renderer';

import {PlacesClassNames, SORTING_ITEMS} from '../../const.js';
import {offers} from '../../mocks-test/offers.js';

import {PlaceList} from './places-list.jsx';

describe(`PlaceList_snapchots`, () => {
  it(`with_data`, () => {
    const tree = renderer
      .create(
        <PlaceList
          offersByCity={offers}
          className={PlacesClassNames.MAIN}
          sortingType={SORTING_ITEMS[0]}
          onPlaceCardNameClick={() => {}}
          onPlaceCardHover={() => {}}
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
          sortingType={SORTING_ITEMS[0]}
          onPlaceCardNameClick={() => {}}
          onPlaceCardHover={() => {}}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

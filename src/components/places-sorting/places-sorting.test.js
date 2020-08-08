import React from 'react';
import renderer from 'react-test-renderer';

import {SORTING_ITEMS} from '../../const.js';
import {PlacesSorting} from './places-sorting.jsx';

describe(`PlacesSorting_snapchots`, () => {
  it(`isClose`, () => {
    const tree = renderer
      .create(
        <PlacesSorting
          sortingType={SORTING_ITEMS[0]}
          isOpen={false}
          onSortingItemClick={() => {}}
          onSortingClick={() => {}}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

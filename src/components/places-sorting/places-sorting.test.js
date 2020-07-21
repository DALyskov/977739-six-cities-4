import React from 'react';
import renderer from 'react-test-renderer';

import {sotringItems} from '../../const.js';
import {PlacesSorting} from './places-sorting.jsx';

describe(`PlacesSorting_snapchots`, () => {
  it(`isClose`, () => {
    const tree = renderer
      .create(
        <PlacesSorting
          sotringType={sotringItems[0]}
          onSortingItemClick={() => {}}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  // it(`isOpen`, () => {
  //   const tree = renderer
  //     .create(
  //       <PlacesSorting
  //         sotringType={sotringItems[0]}
  //         onSortingItemClick={() => {}}
  //       />
  //     )
  //     .toJSON();

  //   expect(tree).toMatchSnapshot();
  // });
});

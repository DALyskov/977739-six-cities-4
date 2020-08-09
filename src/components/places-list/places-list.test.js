import React from 'react';
import renderer from 'react-test-renderer';
import {Router} from 'react-router-dom';

import {PlacesClassNames, SORTING_ITEMS} from '../../const.js';
import {offers} from '../../mocks-test/offers.js';

import history from '../../history.js';
import {PlaceList} from './places-list.jsx';

describe(`PlaceList_snapchots`, () => {
  it(`PlaceList_with_data`, () => {
    const tree = renderer
      .create(
        <Router history={history}>
          <PlaceList
            offersByCity={offers}
            className={PlacesClassNames.MAIN}
            sortingType={SORTING_ITEMS[0]}
            onPlaceCardNameClick={() => {}}
            onPlaceCardHover={() => {}}
            onFavoriteBtnClick={() => {}}
          />
        </Router>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it(`PlaceList_without_data`, () => {
    const tree = renderer
      .create(
        <Router history={history}>
          <PlaceList
            offersByCity={[]}
            className={PlacesClassNames.MAIN}
            sortingType={SORTING_ITEMS[0]}
            onPlaceCardNameClick={() => {}}
            onPlaceCardHover={() => {}}
            onFavoriteBtnClick={() => {}}
          />
        </Router>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

import React from 'react';
import renderer from 'react-test-renderer';
import {Router} from 'react-router-dom';

import {PlacesClassNames} from '../../const.js';
import {offers} from '../../mocks-test/offers.js';

import history from '../../history.js';
import PlaceCard from './place-card.jsx';

const placeData = offers[0];

describe(`PlaceCard_snapchots`, () => {
  it(`PlaceCard_with_data`, () => {
    const tree = renderer
      .create(
        <Router history={history}>
          <PlaceCard
            placeData={placeData}
            className={PlacesClassNames.MAIN[1]}
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

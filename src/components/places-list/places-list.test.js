import React from 'react';
import renderer from 'react-test-renderer';

import {offers as offersData, incompletePlace} from '../../mocks/mocks-test.js';

import PlaceList from './places-list.jsx';

const offers = offersData;

const incompleteOffers = [incompletePlace];

describe(`PlaceList_snapchots`, () => {
  it(`with_data`, () => {
    const tree = renderer
      .create(<PlaceList offers={offers} onPlaceCardNameClick={() => {}} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it(`without_data`, () => {
    const tree = renderer
      .create(<PlaceList offers={[]} onPlaceCardNameClick={() => {}} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it(`incomplete data`, () => {
    const tree = renderer
      .create(
        <PlaceList offers={incompleteOffers} onPlaceCardNameClick={() => {}} />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

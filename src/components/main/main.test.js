import React from 'react';
import renderer from 'react-test-renderer';

import {offers as offersData, incompletePlace} from '../../mocks/mocks-test.js';

import Main from './main.jsx';

const offers = offersData;

const incompleteOffers = [incompletePlace];

describe(`Main_snapchots`, () => {
  it(`with_data`, () => {
    const tree = renderer
      .create(<Main offers={offers} onPlaceCardNameClick={() => {}} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it(`without_data`, () => {
    const tree = renderer
      .create(<Main offers={[]} onPlaceCardNameClick={() => {}} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it(`incomplete_data`, () => {
    const tree = renderer
      .create(
        <Main offers={incompleteOffers} onPlaceCardNameClick={() => {}} />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

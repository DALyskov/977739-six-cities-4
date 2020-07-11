import React from 'react';
import renderer from 'react-test-renderer';

import {offers as offersData, incompletePlace} from '../../mocks/mocks-test.js';

import App from './app.jsx';

const offers = offersData;

const incompleteOffers = [incompletePlace];

describe(`App_snapchots`, () => {
  it(`with_data`, () => {
    const tree = renderer.create(<App offers={offers} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it(`without_data`, () => {
    const tree = renderer.create(<App offers={[]} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it(`incomplete_data`, () => {
    const tree = renderer.create(<App offers={incompleteOffers} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

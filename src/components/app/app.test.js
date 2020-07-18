import React from 'react';
import renderer from 'react-test-renderer';

import {
  offers as offersData,
  incompletePlace,
  reviews,
} from '../../mocks/mocks-test.js';

import App from './app.jsx';

const offers = offersData;

const incompleteOffers = [incompletePlace];

describe(`App_snapchots`, () => {
  it(`with_data`, () => {
    const tree = renderer
      .create(<App offers={offers} reviews={reviews} />, {
        createNodeMock: () => {
          return document.createElement(`div`);
        },
      })
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it(`without_data`, () => {
    const tree = renderer
      .create(<App offers={[]} reviews={[]} />, {
        createNodeMock: () => {
          return document.createElement(`div`);
        },
      })
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it(`incomplete_data`, () => {
    const tree = renderer
      .create(<App offers={incompleteOffers} reviews={reviews} />, {
        createNodeMock: () => {
          return document.createElement(`div`);
        },
      })
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

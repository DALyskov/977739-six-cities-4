import React from 'react';
import renderer from 'react-test-renderer';

import {reviews} from '../../mocks/mocks-test.js';

import ReviewsList from './reviews-list.jsx';

describe(`ReviewsList_snapchots`, () => {
  it(`with_data`, () => {
    const tree = renderer.create(<ReviewsList reviews={reviews} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it(`without_data`, () => {
    const tree = renderer.create(<ReviewsList reviews={[]} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

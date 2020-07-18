import React from 'react';
import renderer from 'react-test-renderer';

import {reviews} from '../../mocks/mocks-test.js';

import ReviewsItem from './reviews-item.jsx';

describe(`ReviewsItem_snapchots`, () => {
  it(`with_data`, () => {
    const tree = renderer
      .create(<ReviewsItem reviewData={reviews[0]} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

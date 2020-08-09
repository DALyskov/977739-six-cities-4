import React from 'react';
import renderer from 'react-test-renderer';

import {ReviewsForm} from './review-form.jsx';

describe(`ReviewsForm_snapchots`, () => {
  it(`ReviewsForm_with_data`, () => {
    const tree = renderer
      .create(
        <ReviewsForm
          review={`abcdifg`}
          rating={`4`}
          isDisabled={false}
          onInputChange={() => {}}
          onSubmit={() => {}}
          activPlaceId={`1`}
          sendReview={() => {}}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it(`ReviewsForm_without_data`, () => {
    const tree = renderer
      .create(
        <ReviewsForm
          review={``}
          rating={``}
          isDisabled={true}
          onInputChange={() => {}}
          onSubmit={() => {}}
          activPlaceId={`1`}
          sendReview={() => {}}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

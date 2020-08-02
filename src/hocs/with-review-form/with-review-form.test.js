import React from 'react';
import renderer from 'react-test-renderer';

import withReviewsForm from './with-review-form.jsx';

const MockComponent = () => {
  return <div></div>;
};

const MockComponentWrapped = withReviewsForm(MockComponent);

describe(`withReviewsForm_snapchots`, () => {
  it(`withReviewsForm_is_rendered_correctly`, () => {
    const tree = renderer.create(<MockComponentWrapped />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

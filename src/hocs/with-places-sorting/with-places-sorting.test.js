import React from 'react';
import renderer from 'react-test-renderer';

import withPlacesSorting from './with-places-sorting.jsx';

const MockComponent = () => {
  return <div></div>;
};

const MockComponentWrapped = withPlacesSorting(MockComponent);

describe(`WithPlacesSorting_snapchots`, () => {
  it(`WithPlacesSorting_is_rendered_correctly`, () => {
    const tree = renderer.create(<MockComponentWrapped />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

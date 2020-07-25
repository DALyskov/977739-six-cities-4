import React from 'react';
import renderer from 'react-test-renderer';

import NoPlaces from './no-places.jsx';

describe(`NoPlaces_snapchots`, () => {
  it(`NoPlaces_rendered_correctly`, () => {
    const tree = renderer.create(<NoPlaces />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

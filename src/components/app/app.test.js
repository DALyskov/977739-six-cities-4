import React from 'react';
import renderer from 'react-test-renderer';

import App from './app.jsx';

const placeDataTest = [
  {
    id: 1,
    isPremium: true,
    image: `img/apartment-01.jpg`,
    price: 120,
    isBookmark: false,
    starsValue: 4,
    name: `Beautiful & luxurious apartment at great location`,
    type: `Apartment`,
  },
  {
    id: 2,
    isPremium: false,
    image: `img/room.jpg`,
    price: 80,
    isBookmark: true,
    starsValue: 4,
    name: `Wood and stone place`,
    type: `Private room`,
  },
  {
    id: 3,
    isPremium: false,
    image: `img/apartment-02.jpg`,
    price: 132,
    isBookmark: false,
    starsValue: 4,
    name: `Wood and stone place`,
    type: `Apartment`,
  },
];

describe(`App snapchots`, () => {
  it(`with data`, () => {
    const tree = renderer.create(<App placeData={placeDataTest} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it(`without data`, () => {
    const tree = renderer.create(<App placeData={[]} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

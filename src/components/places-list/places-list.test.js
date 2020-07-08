import React from 'react';
import renderer from 'react-test-renderer';

import PlaceList from './places-list.jsx';

const offers = [
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

const incompleteOffers = [
  {
    id: 1,
    image: `img/apartment-01.jpg`,
    price: 120,
    starsValue: 4,
    name: `Beautiful & luxurious apartment at great location`,
    type: `Apartment`,
  },
];

describe(`PlaceList_snapchots`, () => {
  it(`with data`, () => {
    const tree = renderer.create(<PlaceList offers={offers} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it(`without data`, () => {
    const tree = renderer.create(<PlaceList offers={[]} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it(`incomplete data`, () => {
    const tree = renderer
      .create(<PlaceList offers={incompleteOffers} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

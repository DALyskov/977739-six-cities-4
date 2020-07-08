import React from 'react';
import renderer from 'react-test-renderer';

import PlaceCard from './place-card.jsx';

const offer = {
  id: 1,
  isPremium: true,
  image: `img/apartment-01.jpg`,
  price: 120,
  isBookmark: false,
  starsValue: 4,
  name: `Beautiful & luxurious apartment at great location`,
  type: `Apartment`,
};

const incompleteOffer = {
  id: 1,
  image: `img/apartment-01.jpg`,
  price: 120,
  starsValue: 4,
  name: `Beautiful & luxurious apartment at great location`,
  type: `Apartment`,
};

describe(`PlaceCard_snapchots`, () => {
  it(`with data`, () => {
    const tree = renderer
      .create(
        <PlaceCard
          place={offer}
          onPlaceCardNameClick={() => {}}
          onPlaceCardHover={() => {}}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it(`incomplete data`, () => {
    const tree = renderer
      .create(
        <PlaceCard
          place={incompleteOffer}
          onPlaceCardNameClick={() => {}}
          onPlaceCardHover={() => {}}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

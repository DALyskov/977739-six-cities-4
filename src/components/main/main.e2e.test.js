import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Main from './main.jsx';

Enzyme.configure({
  adapter: new Adapter(),
});

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

describe(`Main ee`, () => {
  it(`Should placeCardName be pressed`, () => {
    const onPlaceCardNameClick = jest.fn();
    const preventDefault = jest.fn();
    const main = mount(
      <Main
        placeData={placeDataTest}
        onPlaceCardNameClick={onPlaceCardNameClick}
      />
    );

    const placeCardName = main.find(`h2.place-card__name`);
    placeCardName.forEach((v) => v.simulate(`click`, {preventDefault}));

    // console.log(onPlaceCardNameClick.mock);
    // console.log(preventDefault.mock);

    expect(onPlaceCardNameClick.mock.calls.length).toBe(placeDataTest.length);
    // expect(preventDefault.mock.calls.length).toBe(1);
  });
});

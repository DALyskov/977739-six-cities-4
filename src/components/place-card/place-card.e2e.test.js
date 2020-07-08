import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import PlaceCard from './place-card.jsx';

Enzyme.configure({
  adapter: new Adapter(),
});

const place = {
  id: 1,
  isPremium: true,
  image: `img/apartment-01.jpg`,
  price: 120,
  isBookmark: false,
  starsValue: 4,
  name: `Beautiful & luxurious apartment at great location`,
  type: `Apartment`,
};

describe(`PlaceCard_ee`, () => {
  it(`PlaceCard_on_hover`, () => {
    const onPlaceCardNameClick = jest.fn();
    const onPlaceCardHover = jest.fn((...args) => [...args]);
    const placeCard = mount(
      <PlaceCard
        place={place}
        onPlaceCardNameClick={onPlaceCardNameClick}
        onPlaceCardHover={onPlaceCardHover}
      />
    );

    placeCard.simulate(`mouseenter`);

    expect(onPlaceCardHover).toHaveBeenCalledTimes(1);

    expect(onPlaceCardHover.mock.calls[0][0]).toMatchObject(place);
  });

  it(`PlaceCardName_on_click`, () => {
    const onPlaceCardNameClick = jest.fn();
    const onPlaceCardHover = jest.fn((...args) => [...args]);
    const placeCard = mount(
      <PlaceCard
        place={place}
        onPlaceCardNameClick={onPlaceCardNameClick}
        onPlaceCardHover={onPlaceCardHover}
      />
    );

    const placeCardName = placeCard.find(`.place-card__name`);

    placeCardName.simulate(`click`);

    expect(onPlaceCardNameClick).toHaveBeenCalledTimes(1);
  });
});

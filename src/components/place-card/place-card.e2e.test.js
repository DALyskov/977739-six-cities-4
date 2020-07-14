import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {offers} from '../../mocks/mocks-test.js';

import PlaceCard from './place-card.jsx';

Enzyme.configure({
  adapter: new Adapter(),
});

const placeData = offers[0];

describe(`PlaceCard_ee`, () => {
  it(`PlaceCard_on_hover`, () => {
    const onPlaceCardNameClick = jest.fn();
    const onPlaceCardHover = jest.fn((...args) => [...args]);
    const placeCard = mount(
      <PlaceCard
        placeData={placeData}
        onPlaceCardNameClick={onPlaceCardNameClick}
        onPlaceCardHover={onPlaceCardHover}
      />
    );

    placeCard.simulate(`mouseenter`);

    expect(onPlaceCardHover).toHaveBeenCalledTimes(1);

    expect(onPlaceCardHover.mock.calls[0][0]).toMatchObject(placeData);
  });

  it(`PlaceCardName_on_click`, () => {
    const onPlaceCardNameClick = jest.fn();
    const onPlaceCardHover = jest.fn((...args) => [...args]);
    const preventLinck = jest.fn();
    const placeCard = mount(
      <PlaceCard
        placeData={placeData}
        onPlaceCardNameClick={onPlaceCardNameClick}
        onPlaceCardHover={onPlaceCardHover}
      />
    );

    const placeCardName = placeCard.find(`.place-card__name`);

    placeCardName.simulate(`click`, {
      preventDefault: preventLinck,
    });

    expect(onPlaceCardNameClick).toHaveBeenCalledTimes(1);
    expect(preventLinck).toHaveBeenCalledTimes(1);
  });
});

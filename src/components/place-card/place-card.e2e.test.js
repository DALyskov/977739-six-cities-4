import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {PlacesClassNames} from '../../const.js';
import {offers} from '../../mocks/mocks-test.js';

import PlaceCard from './place-card.jsx';

Enzyme.configure({
  adapter: new Adapter(),
});

const placeData = offers[0];

describe(`PlaceCard_ee`, () => {
  it(`PlaceCard_on_hover`, () => {
    const onPlaceCardNameClick = jest.fn();
    const onPlaceCardHover = jest.fn();
    const placeCard = mount(
      <PlaceCard
        placeData={placeData}
        className={PlacesClassNames.MAIN[1]}
        onPlaceCardNameClick={onPlaceCardNameClick}
        onPlaceCardHover={onPlaceCardHover}
      />
    );

    placeCard.simulate(`mouseenter`);
    placeCard.simulate(`mouseleave`);

    expect(onPlaceCardHover).toHaveBeenCalledTimes(2);
  });

  it(`PlaceCardName_on_click`, () => {
    const onPlaceCardNameClick = jest.fn();
    const onPlaceCardHover = jest.fn();
    const preventLinck = jest.fn();
    const placeCard = mount(
      <PlaceCard
        placeData={placeData}
        className={PlacesClassNames.MAIN[1]}
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

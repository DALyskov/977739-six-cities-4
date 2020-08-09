import React from 'react';
import {Router} from 'react-router-dom';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {PlacesClassNames} from '../../const.js';
import {offers} from '../../mocks-test/offers.js';

import history from '../../history.js';
import PlaceCard from './place-card.jsx';

Enzyme.configure({
  adapter: new Adapter(),
});

const placeData = offers[0];

describe(`PlaceCard_ee`, () => {
  const onPlaceCardNameClick = jest.fn();
  const onPlaceCardHover = jest.fn();
  const onFavoriteBtnClick = jest.fn();
  const preventLinck = jest.fn();

  it(`PlaceCard_on_hover`, () => {
    const placeCard = mount(
      <Router history={history}>
        <PlaceCard
          placeData={placeData}
          className={PlacesClassNames.MAIN[1]}
          onPlaceCardNameClick={onPlaceCardNameClick}
          onPlaceCardHover={onPlaceCardHover}
          onFavoriteBtnClick={onFavoriteBtnClick}
        />
      </Router>
    );

    placeCard.simulate(`mouseenter`);
    placeCard.simulate(`mouseleave`);

    expect(onPlaceCardHover).toHaveBeenCalledTimes(2);
  });

  it(`PlaceCardName_on_click`, () => {
    const placeCard = mount(
      <Router history={history}>
        <PlaceCard
          placeData={placeData}
          className={PlacesClassNames.MAIN[1]}
          onPlaceCardNameClick={onPlaceCardNameClick}
          onPlaceCardHover={onPlaceCardHover}
          onFavoriteBtnClick={onFavoriteBtnClick}
        />
      </Router>
    );

    const placeCardName = placeCard.find(`.place-card__link`).at(1);

    placeCardName.simulate(`click`, {});

    expect(onPlaceCardNameClick).toHaveBeenCalledTimes(1);
  });

  it(`PlaceCardFavoriteBtn_on_click`, () => {
    const placeCard = mount(
      <Router history={history}>
        <PlaceCard
          placeData={placeData}
          className={PlacesClassNames.MAIN[1]}
          onPlaceCardNameClick={onPlaceCardNameClick}
          onPlaceCardHover={onPlaceCardHover}
          onFavoriteBtnClick={onFavoriteBtnClick}
        />
      </Router>
    );

    const favoriteBtn = placeCard.find(`.place-card__bookmark-button`);

    favoriteBtn.simulate(`click`, {
      preventDefault: preventLinck,
    });

    expect(onFavoriteBtnClick).toHaveBeenCalledTimes(1);
    expect(preventLinck).toHaveBeenCalledTimes(1);
  });
});

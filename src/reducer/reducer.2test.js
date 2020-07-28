import {reducer, ActionType, ActionCreator} from './reducer.js';

import {sortingItems} from './const.js';
import {offers, cities, reviews, offersByCity} from './mocks/mocks-test.js';
import originalOffers from './mocks/offers';

// const getCities = (offersData) => {
//   const citiesData = [...new Set(offersData.map((place) => place.city.name))];
//   const citiesList = citiesData.slice(0, 6);
//   return citiesList;
// };

const getOffersByCity = (state, activeCity) => {
  return state.filter((offer) => offer.city.name === activeCity);
};

const initialState = {
  cities,
  offers: originalOffers,
  offersByCity,
  activPlaceCard: false,
  reviews,
  activeCity: originalOffers[0].city.name,
  sortingType: sortingItems[0],
  hoverCityId: false,
};

describe(`reducer_test`, () => {
  it(`Reducer_without_additional_parameters_should_return_initial_state`, () => {
    expect(reducer(undefined, {})).toEqual({
      cities,
      offers: originalOffers,
      offersByCity: getOffersByCity(
        originalOffers,
        originalOffers[0].city.name
      ),
      activPlaceCard: false,
      reviews,
      activeCity: originalOffers[0].city.name,
      sortingType: sortingItems[0],
      hoverCityId: false,
    });
  });

  it(`Reducer_should_change_activeCity_and_offersByCity`, () => {
    expect(
      reducer(initialState, {
        type: ActionType.CHANGE_ACTIVE_CITY,
        payload: cities[1],
      })
    ).toEqual({
      cities,
      offers: originalOffers,
      offersByCity: [originalOffers[3]],
      activPlaceCard: false,
      reviews,
      activeCity: cities[1],
      sortingType: sortingItems[0],
      hoverCityId: false,
    });
  });

  it(`Reducer_should_change_activPlaceCard`, () => {
    expect(
      reducer(initialState, {
        type: ActionType.CHANGE_PLACE,
        payload: originalOffers[0],
      })
    ).toEqual({
      cities,
      offers: originalOffers,
      offersByCity,
      activPlaceCard: originalOffers[0],
      reviews,
      activeCity: offers[0].city.name,
      sortingType: sortingItems[0],
      hoverCityId: false,
    });
  });

  it(`Reducer_should_change_sortingType`, () => {
    expect(
      reducer(initialState, {
        type: ActionType.CHANGE_SOTRING_TYPE,
        payload: sortingItems[1],
      })
    ).toEqual({
      cities,
      offers: originalOffers,
      offersByCity,
      activPlaceCard: false,
      reviews,
      activeCity: offers[0].city.name,
      sortingType: sortingItems[1],
      hoverCityId: false,
    });
  });

  it(`Reducer_should_change_changeHoverCityId`, () => {
    expect(
      reducer(initialState, {
        type: ActionType.CHANGE_HOVER_CITY_ID,
        payload: 1,
      })
    ).toEqual({
      cities,
      offers: originalOffers,
      offersByCity,
      activPlaceCard: false,
      reviews,
      activeCity: offers[0].city.name,
      sortingType: sortingItems[0],
      hoverCityId: 1,
    });
  });
});

describe(`Action_creators_work_correctly`, () => {
  it(`Action_creator_for_changeActiveCity`, function () {
    expect(ActionCreator.changeActiveCity(offers[0].city.name)).toEqual({
      type: ActionType.CHANGE_ACTIVE_CITY,
      payload: offers[0].city.name,
    });
  });

  it(`Action_creator_for_changePlace`, function () {
    expect(ActionCreator.changePlace(offers[0])).toEqual({
      type: ActionType.CHANGE_PLACE,
      payload: offers[0],
    });
  });

  it(`Action_creator_for_changesortingType`, function () {
    expect(ActionCreator.changesortingType(sortingItems[0])).toEqual({
      type: ActionType.CHANGE_SOTRING_TYPE,
      payload: sortingItems[0],
    });
  });

  it(`Action_creator_for_changeHoverCityId`, function () {
    expect(ActionCreator.changeHoverCityId(1)).toEqual({
      type: ActionType.CHANGE_HOVER_CITY_ID,
      payload: 1,
    });
  });
});

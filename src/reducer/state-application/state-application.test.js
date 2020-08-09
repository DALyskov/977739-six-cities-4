import {SORTING_ITEMS} from '../../const.js';
import {offers} from '../../mocks-test/offers.js';
import {cities} from '../../mocks-test/cities.js';

import {reducer, ActionType, ActionCreator} from './state-application.js';

const initialState = {
  sortingType: SORTING_ITEMS[0],
  hoverCityId: false,
  activeCity: false,
  activPlaceId: ``,
};

describe(`AppReducer_test`, () => {
  it(`AppReducer_without_additional_parameters_should_return_initial_state`, () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it(`AppReducer_should_change_activeCity`, () => {
    expect(
      reducer(initialState, {
        type: ActionType.CHANGE_ACTIVE_CITY,
        payload: cities[0],
      })
    ).toEqual(Object.assign({}, initialState, {activeCity: cities[0]}));
  });

  it(`AppReducer_should_change_changeActivPlaceId`, () => {
    expect(
      reducer(initialState, {
        type: ActionType.CHANGE_ACTIV_PLACE_ID,
        payload: 1,
      })
    ).toEqual(Object.assign({}, initialState, {activPlaceId: 1}));
  });

  it(`AppReducer_should_change_sortingType`, () => {
    expect(
      reducer(initialState, {
        type: ActionType.CHANGE_SOTRING_TYPE,
        payload: SORTING_ITEMS[1],
      })
    ).toEqual(Object.assign({}, initialState, {sortingType: SORTING_ITEMS[1]}));
  });

  it(`AppReducer_should_change_hoverCityId`, () => {
    expect(
      reducer(initialState, {
        type: ActionType.CHANGE_HOVER_CITY_ID,
        payload: 1,
      })
    ).toEqual(Object.assign({}, initialState, {hoverCityId: 1}));
  });
});

describe(`AppActionCreators_work_correctly`, () => {
  it(`AppActionCreator_for_changeActiveCity`, function () {
    expect(ActionCreator.changeActiveCity(offers[0].city.name)).toEqual({
      type: ActionType.CHANGE_ACTIVE_CITY,
      payload: offers[0].city.name,
    });
  });

  it(`AppActionCreator_for_changeActivPlaceId`, function () {
    expect(ActionCreator.changeActivPlaceId(1)).toEqual({
      type: ActionType.CHANGE_ACTIV_PLACE_ID,
      payload: 1,
    });
  });

  it(`AppActionCreator_for_changesortingType`, function () {
    expect(ActionCreator.changeSortingType(SORTING_ITEMS[0])).toEqual({
      type: ActionType.CHANGE_SOTRING_TYPE,
      payload: SORTING_ITEMS[0],
    });
  });

  it(`AppActionCreator_for_changeHoverCityId`, function () {
    expect(ActionCreator.changeHoverCityId(1)).toEqual({
      type: ActionType.CHANGE_HOVER_CITY_ID,
      payload: 1,
    });
  });
});

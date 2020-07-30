import {sortingItems, PageType} from '../../const.js';
import {offers} from '../../mocks-test/offers.js';
import {cities} from '../../mocks-test/cities.js';

import {reducer, ActionType, ActionCreator} from './state-application.js';

const initialState = {
  sortingType: sortingItems[0],
  hoverCityId: false,
  activPlaceCard: false,
  activePage: PageType.MAIN,
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

  it(`AppReducer_should_change_activPlaceCard`, () => {
    expect(
      reducer(initialState, {
        type: ActionType.CHANGE_PLACE,
        payload: offers[0],
      })
    ).toEqual(Object.assign({}, initialState, {activPlaceCard: offers[0]}));
  });

  it(`AppReducer_should_change_sortingType`, () => {
    expect(
      reducer(initialState, {
        type: ActionType.CHANGE_SOTRING_TYPE,
        payload: sortingItems[1],
      })
    ).toEqual(Object.assign({}, initialState, {sortingType: sortingItems[1]}));
  });

  it(`AppReducer_should_change_hoverCityId`, () => {
    expect(
      reducer(initialState, {
        type: ActionType.CHANGE_HOVER_CITY_ID,
        payload: 1,
      })
    ).toEqual(Object.assign({}, initialState, {hoverCityId: 1}));
  });

  it(`AppReducer_should_change_activePage`, () => {
    expect(
      reducer(initialState, {
        type: ActionType.CHANGE_ACTIVE_PAGE,
        payload: PageType.PROPERTY,
      })
    ).toEqual(Object.assign({}, initialState, {activePage: PageType.PROPERTY}));
  });
});

describe(`AppActionCreators_work_correctly`, () => {
  it(`AppActionCreator_for_changeActiveCity`, function () {
    expect(ActionCreator.changeActiveCity(offers[0].city.name)).toEqual({
      type: ActionType.CHANGE_ACTIVE_CITY,
      payload: offers[0].city.name,
    });
  });

  it(`AppActionCreator_for_changePlace`, function () {
    expect(ActionCreator.changePlace(offers[0])).toEqual({
      type: ActionType.CHANGE_PLACE,
      payload: offers[0],
    });
  });

  it(`AppActionCreator_for_changesortingType`, function () {
    expect(ActionCreator.changesortingType(sortingItems[0])).toEqual({
      type: ActionType.CHANGE_SOTRING_TYPE,
      payload: sortingItems[0],
    });
  });

  it(`AppActionCreator_for_changeHoverCityId`, function () {
    expect(ActionCreator.changeHoverCityId(1)).toEqual({
      type: ActionType.CHANGE_HOVER_CITY_ID,
      payload: 1,
    });
  });

  it(`AppActionCreator_for_changeActivePage`, function () {
    expect(ActionCreator.changeActivePage(PageType.PROPERTY)).toEqual({
      type: ActionType.CHANGE_ACTIVE_PAGE,
      payload: PageType.PROPERTY,
    });
  });
});

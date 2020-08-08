import {SORTING_ITEMS, PageType} from '../../const.js';
import {extend} from '../../utils/common.js';

const initialState = {
  sortingType: SORTING_ITEMS[0],
  hoverCityId: false,
  activeCity: false,
  // activPlaceCard: false,
  // activePage: PageType.MAIN,
};

const ActionType = {
  CHANGE_ACTIVE_CITY: `CHANGE_ACTIVE_CITY`,
  CHANGE_ACTIV_PLACE_ID: `CHANGE_ACTIV_PLACE_ID`,
  // CHANGE_PLACE: `CHANGE_PLACE`,
  CHANGE_SOTRING_TYPE: `CHANGE_SOTRING_TYPE`,
  CHANGE_HOVER_CITY_ID: `CHANGE_HOVER_CITY_ID`,
  CHANGE_ACTIVE_PAGE: `CHANGE_ACTIVE_PAGE`,
};

const ActionCreator = {
  changeActiveCity: (targetCity) => ({
    type: ActionType.CHANGE_ACTIVE_CITY,
    payload: targetCity,
  }),
  changeActivPlaceId: (targetCityId) => ({
    type: ActionType.CHANGE_ACTIV_PLACE_ID,
    payload: targetCityId,
  }),
  // changePlace: (placeData) => ({
  //   type: ActionType.CHANGE_PLACE,
  //   payload: placeData,
  // }),
  changesortingType: (sortingType) => ({
    type: ActionType.CHANGE_SOTRING_TYPE,
    payload: sortingType,
  }),
  changeHoverCityId: (placeDataId) => ({
    type: ActionType.CHANGE_HOVER_CITY_ID,
    payload: placeDataId,
  }),
  // changeActivePage: (activePage) => ({
  //   type: ActionType.CHANGE_ACTIVE_PAGE,
  //   payload: activePage,
  // }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_ACTIVE_CITY:
      return extend(state, {
        activeCity: action.payload,
        // offersByCity: getOffersByCity(state.offers, action.payload),
      });
    case ActionType.CHANGE_ACTIV_PLACE_ID:
      return extend(state, {
        activPlaceId: action.payload,
      });
    // case ActionType.CHANGE_PLACE:
    //   return extend(state, {activPlaceCard: action.payload});
    case ActionType.CHANGE_SOTRING_TYPE:
      return extend(state, {sortingType: action.payload});
    case ActionType.CHANGE_HOVER_CITY_ID:
      return extend(state, {hoverCityId: action.payload});
    // case ActionType.CHANGE_ACTIVE_PAGE:
    //   return extend(state, {activePage: action.payload});
  }
  return state;
};

export {reducer, ActionType, ActionCreator};

import {SORTING_ITEMS} from '../../const.js';
import {extend} from '../../utils/common.js';

const initialState = {
  sortingType: SORTING_ITEMS[0],
  hoverCityId: false,
  activeCity: false,
  activPlaceId: ``,
};

const ActionType = {
  CHANGE_ACTIVE_CITY: `CHANGE_ACTIVE_CITY`,
  CHANGE_ACTIV_PLACE_ID: `CHANGE_ACTIV_PLACE_ID`,
  CHANGE_SOTRING_TYPE: `CHANGE_SOTRING_TYPE`,
  CHANGE_HOVER_CITY_ID: `CHANGE_HOVER_CITY_ID`,
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
  changeSortingType: (sortingType) => ({
    type: ActionType.CHANGE_SOTRING_TYPE,
    payload: sortingType,
  }),
  changeHoverCityId: (placeDataId) => ({
    type: ActionType.CHANGE_HOVER_CITY_ID,
    payload: placeDataId,
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_ACTIVE_CITY:
      return extend(state, {
        activeCity: action.payload,
      });
    case ActionType.CHANGE_ACTIV_PLACE_ID:
      return extend(state, {
        activPlaceId: action.payload,
      });
    case ActionType.CHANGE_SOTRING_TYPE:
      return extend(state, {sortingType: action.payload});
    case ActionType.CHANGE_HOVER_CITY_ID:
      return extend(state, {hoverCityId: action.payload});
  }
  return state;
};

export {reducer, ActionType, ActionCreator};

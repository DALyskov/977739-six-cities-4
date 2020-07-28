import {sortingItems} from '../../const.js';
import {extend} from '../../utils/common.js';

// const getOffersByCity = (offersData, activeCity) => {
//   if (offersData.lenght === 0) {
//     return [];
//   }
//   return offersData.filter((offer) => offer.city.name === activeCity);
// };

const initialState = {
  sortingType: sortingItems[0],
  hoverCityId: false,
  activPlaceCard: false,
};

const ActionType = {
  CHANGE_ACTIVE_CITY: `CHANGE_ACTIVE_CITY`,
  CHANGE_PLACE: `CHANGE_PLACE`,
  CHANGE_SOTRING_TYPE: `CHANGE_SOTRING_TYPE`,
  CHANGE_HOVER_CITY_ID: `CHANGE_HOVER_CITY_ID`,
};

const ActionCreator = {
  changeActiveCity: (targetCity) => ({
    type: ActionType.CHANGE_ACTIVE_CITY,
    payload: targetCity,
  }),
  changePlace: (placeData) => ({
    type: ActionType.CHANGE_PLACE,
    payload: placeData,
  }),
  changesortingType: (sortingType) => ({
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
        // offersByCity: getOffersByCity(state.offers, action.payload),
      });
    case ActionType.CHANGE_PLACE:
      return extend(state, {activPlaceCard: action.payload});
    case ActionType.CHANGE_SOTRING_TYPE:
      return extend(state, {sortingType: action.payload});
    case ActionType.CHANGE_HOVER_CITY_ID:
      return extend(state, {hoverCityId: action.payload});
  }
  return state;
};

export {reducer, ActionType, ActionCreator};

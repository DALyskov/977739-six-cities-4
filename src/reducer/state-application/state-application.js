import {sotringItems} from '../../const.js';
// import offers from '../../mocks/offers.js';
// import reviews from '../../mocks/reviews.js';
import {extend} from '../../utils/common.js';

const initialState = {
  // cities: getCities(offers), // data
  // offers, // data
  // offersByCity: getOffersByCity(offers, getActiveCity(offers)), // data
  // activPlaceCard: false, // data
  // reviews, // data
  // activeCity: getActiveCity(offers), // data
  sotringType: sotringItems[0], // state application
  hoverCityId: false, // state application
};

const ActionType = {
  // CHANGE_ACTIVE_CITY: `CHANGE_ACTIVE_CITY`,
  // CHANGE_PLACE: `CHANGE_PLACE`,
  CHANGE_SOTRING_TYPE: `CHANGE_SOTRING_TYPE`,
  CHANGE_HOVER_CITY_ID: `CHANGE_HOVER_CITY_ID`,
};

const ActionCreator = {
  // changeActiveCity: (targetCity) => ({
  //   type: ActionType.CHANGE_ACTIVE_CITY,
  //   payload: targetCity,
  // }),
  // changePlace: (placeData) => ({
  //   type: ActionType.CHANGE_PLACE,
  //   payload: placeData,
  // }),
  changeSotringType: (sotringType) => ({
    type: ActionType.CHANGE_SOTRING_TYPE,
    payload: sotringType,
  }),
  changeHoverCityId: (placeDataId) => ({
    type: ActionType.CHANGE_HOVER_CITY_ID,
    payload: placeDataId,
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    // case ActionType.CHANGE_ACTIVE_CITY:
    //   return extend(state, {
    //     activeCity: action.payload,
    //     offersByCity: getOffersByCity(state.offers, action.payload),
    //     sotringType: sotringItems[0],
    //   });
    // case ActionType.CHANGE_PLACE:
    //   return extend(state, {activPlaceCard: action.payload});
    case ActionType.CHANGE_SOTRING_TYPE:
      return extend(state, {sotringType: action.payload});
    case ActionType.CHANGE_HOVER_CITY_ID:
      return extend(state, {hoverCityId: action.payload});
  }
  return state;
};

export {reducer, ActionType, ActionCreator};

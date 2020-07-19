import offers from './mocks/offers.js';
import reviews from './mocks/reviews.js';
import {extend} from './utils/common.js';

const getCities = (offersData) => {
  const cities = [...new Set(offersData.map((place) => place.city.name))];
  const citiesList = cities.slice(0, 6);
  return citiesList;
};

const getOffersByCity = (state, activeCity) => {
  return state.filter((offer) => offer.city.name === activeCity);
};

const initialState = {
  cities: getCities(offers),
  offers,
  offersByCity: getOffersByCity(offers, offers[0].city.name),
  activPlaceCard: null,
  reviews,
  activeCity: offers[0].city.name,
};

const ActionType = {
  CHANGE_ACTIVE_CITY: `CHANGE_ACTIVE_CITY`,
  GET_OFFERS: `GET_OFFERS;`,
  CHANGE_PLACE: `CHANGE_PLACE`,
};

const ActionCreater = {
  changeActiveCity: (targetCity) => ({
    type: ActionType.CHANGE_ACTIVE_CITY,
    payload: targetCity,
  }),
  getOffers: (activeCity) => ({
    type: ActionType.GET_OFFERS,
    payload: activeCity,
  }),
  changePlace: (placeData) => ({
    type: ActionType.CHANGE_PLACE,
    payload: placeData,
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_ACTIVE_CITY:
      return extend(state, {activeCity: action.payload});
    // возможно, стоит подключить GET_OFFERS в CHANGE_ACTIVE_CITY
    case ActionType.GET_OFFERS:
      return extend(state, {
        offersByCity: getOffersByCity(state.offers, action.payload),
      });
    case ActionType.CHANGE_PLACE:
      return extend(state, {activPlaceCard: action.payload});
  }
  return state;
};

export {reducer, ActionType, ActionCreater};

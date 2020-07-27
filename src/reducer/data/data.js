import {extend} from '../../utils/common.js';

import {createOffers} from '../../adapters/offers.js';
import {createReviews} from '../../adapters/reviews.js';

const getActiveCity = (offersData) => {
  if (offersData.length === 0) {
    return false;
  }
  return offersData[0].city.name;
};

// const getOffersByCity = (offersData, activeCity) => {
//   if (offersData.lenght === 0) {
//     return [];
//   }
//   return offersData.filter((offer) => offer.city.name === activeCity);
// };

const initialState = {
  offers: [],
  nearbyOffers: [],
  activPlaceCard: false,
};

const ActionType = {
  LOAD_OFFERS: `LOAD_OFFERS`,
  LOAD_REVIEWS: `LOAD_REVIEWS`,
  LOAD_NEARBY_OFFERS: `LOAD_NEARBY_OFFERS`,
  CHANGE_ACTIVE_CITY: `CHANGE_ACTIVE_CITY`,
  CHANGE_PLACE: `CHANGE_PLACE`,
};

const ActionCreator = {
  loadOffers: (offersData) => ({
    type: ActionType.LOAD_OFFERS,
    payload: offersData,
  }),
  loadReviews: (reviewsData) => ({
    type: ActionType.LOAD_REVIEWS,
    payload: reviewsData,
  }),
  loadNearbyOffers: (offersData) => ({
    type: ActionType.LOAD_NEARBY_OFFERS,
    payload: offersData,
  }),
  changeActiveCity: (targetCity) => ({
    type: ActionType.CHANGE_ACTIVE_CITY,
    payload: targetCity,
  }),
  changePlace: (placeData) => ({
    type: ActionType.CHANGE_PLACE,
    payload: placeData,
  }),
};

const Operation = {
  loadOffers: () => (dispatch, getState, api) => {
    return api.get(`/hotels`).then((response) => {
      const offersData = createOffers(response.data);
      dispatch(ActionCreator.loadOffers(offersData));
      dispatch(ActionCreator.changeActiveCity(getActiveCity(offersData)));
    });
  },
  loadReviews: (id) => (dispatch, getState, api) => {
    return api.get(`/comments/${id}`).then((response) => {
      dispatch(ActionCreator.loadReviews(createReviews(response.data)));
    });
  },
  loadNearbyOffers: (id) => (dispatch, getState, api) => {
    return api.get(`/hotels/${id}/nearby`).then((response) => {
      dispatch(ActionCreator.loadNearbyOffers(createOffers(response.data)));
    });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_OFFERS:
      return extend(state, {offers: action.payload});
    case ActionType.LOAD_REVIEWS:
      return extend(state, {reviews: action.payload});
    case ActionType.LOAD_NEARBY_OFFERS:
      return extend(state, {nearbyOffers: action.payload});
    case ActionType.CHANGE_ACTIVE_CITY:
      return extend(state, {
        activeCity: action.payload,
        // offersByCity: getOffersByCity(state.offers, action.payload),
      });
    case ActionType.CHANGE_PLACE:
      return extend(state, {activPlaceCard: action.payload});
  }
  return state;
};

export {reducer, ActionType, ActionCreator, Operation};

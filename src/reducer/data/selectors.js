import NameSpace from '../name-space.js';

export const getOffers = (state) => {
  return state[NameSpace.DATA].offers;
};

export const getNearbyOffers = (state) => {
  return state[NameSpace.DATA].nearbyOffers;
};

export const getReviews = (state) => {
  return state[NameSpace.DATA].reviews;
};

export const getFavoriteOffers = (state) => {
  return state[NameSpace.DATA].favoriteOffers;
};

export const getErrReason = (state) => {
  return state[NameSpace.DATA].errReason;
};

export const getErrMessage = (state) => {
  return state[NameSpace.DATA].errMessage;
};

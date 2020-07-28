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

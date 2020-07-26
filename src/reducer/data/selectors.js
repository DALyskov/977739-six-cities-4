import {createSelector} from 'reselect';
import NameSpace from '../name-space.js';

export const getOffers = (state) => {
  return state[NameSpace.DATA].offers;
};

export const getNearbyOffers = (state) => {
  return state[NameSpace.DATA].nearbyOffers;
};

export const getActiveCity = (state) => {
  return state[NameSpace.DATA].activeCity;
};
// нужна верхнаяя
// export const getActiveCity = createSelector(getOffers, (result) => {
//   if (result.length === 0) {
//     return false;
//   }
//   return result[0].city.name;
// });

// const getOffersByCity = (state) => {
//   return state[NameSpace.DATA].offersByCity;
// };

export const getOffersByCity = createSelector(
  getOffers,
  getActiveCity,
  (offers, activeCity) => {
    if (offers.lenght === 0 || !activeCity) {
      return [];
    }
    return offers.filter((place) => place.city.name === activeCity);
  }
);

// const getCities = (state) => {
//   return state[NameSpace.DATA].cities;
// };

export const getCities = createSelector(getOffers, (offers) => {
  if (offers.lenght === 0) {
    return [];
  }
  const cities = [...new Set(offers.map((place) => place.city.name))];
  const citiesList = cities.slice(0, 6);
  return citiesList;
});

export const getActivPlaceCard = (state) => {
  return state[NameSpace.DATA].activPlaceCard;
};

export const getReviews = (state) => {
  return state[NameSpace.DATA].reviews;
};

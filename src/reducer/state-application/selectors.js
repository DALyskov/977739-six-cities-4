import {createSelector} from 'reselect';

import NameSpace from '../name-space.js';
import {getOffers, getFavoriteOffers} from '../data/selectors.js';

export const getActiveCity = (state) => {
  return state[NameSpace.STATE_APPLICATION].activeCity;
};

export const getActivPlaceId = (state) => {
  return state[NameSpace.STATE_APPLICATION].activPlaceId;
};

// export const getActivPlaceCard = (state) => {
//   return state[NameSpace.STATE_APPLICATION].activPlaceCard;
// };

// export const getActivPlaceCard = createSelector(
//   getOffers,
//   getActivPlaceId,
//   (offers, activePlaceId) => {
//     // if (offers.lenght === 0 || !activePlaceId) {
//     //   return [];
//     // }
//     return offers.find((place) => place.id === activePlaceId);
//   }
// );

export const getSortingType = (state) => {
  return state[NameSpace.STATE_APPLICATION].sortingType;
};

export const getHoverCityId = (state) => {
  return state[NameSpace.STATE_APPLICATION].hoverCityId;
};

export const getActivePage = (state) => {
  return state[NameSpace.STATE_APPLICATION].activePage;
};

export const getCities = createSelector(getOffers, (offers) => {
  if (offers.lenght === 0) {
    return [];
  }
  const cities = [...new Set(offers.map((place) => place.city.name))];
  const citiesList = cities.slice(0, 6);
  return citiesList;
});

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

export const getFavoriteCities = createSelector(getFavoriteOffers, (offers) => {
  if (offers.lenght === 0) {
    return [];
  }
  const cities = [...new Set(offers.map((place) => place.city.name))];
  return cities;
});

// export const getFavoriteOffersByCity = createSelector(
//   getOffers,
//   getActiveCity,
//   (offers, activeCity) => {
//     if (offers.lenght === 0 || !activeCity) {
//       return [];
//     }
//     return offers.filter((place) => place.city.name === activeCity);
//   }
// );

import {createSelector} from 'reselect';

import NameSpace from '../name-space.js';
import {getOffers} from '../data/selectors.js';

export const getActiveCity = (state) => {
  return state[NameSpace.STATE_APPLICATION].activeCity;
};

export const getActivPlaceCard = (state) => {
  return state[NameSpace.STATE_APPLICATION].activPlaceCard;
};

export const getSortingType = (state) => {
  return state[NameSpace.STATE_APPLICATION].sortingType;
};

export const getHoverCityId = (state) => {
  return state[NameSpace.STATE_APPLICATION].hoverCityId;
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

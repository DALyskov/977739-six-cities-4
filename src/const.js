export const MapClassName = {
  MAIN: `cities__map`,
  PROPERTY: `property__map`,
};

export const PlacesClassNames = {
  MAIN: [
    `cities__places-list places__list tabs__content`,
    `cities__place-card`,
  ],
  PROPERTY: [
    `near-places__list places__list tabs__content`,
    `near-places__card`,
  ],
  FAVORITE: [`favorites__places`, `favorites__card`],
};

export const SORTING_ITEMS = [
  `Popular`,
  `Price: low to high`,
  `Price: high to low`,
  `Top rated first`,
];

export const SortingTypeDict = {
  PRICE: `price`,
  RATING: `rating`,
};

export const AuthorizationStatus = {
  AUTH: `AUTH`,
  NO_AUTH: `NO_AUTH`,
};

export const HeaderClassNames = {
  MAIN: `header__logo-link`,
  OTHER_PAGE: `header__logo-link header__logo-link--active`,
};

export const AppRoute = {
  MAIN: `/`,
  PROPERTY: `/offer`,
  SING_IN: `/login`,
  FAVORITES: `/favorites`,
};

export const ErrReason = {
  LOAD_OFFERS: `LOAD_OFFERS`,
  LOAD_REVIEWS: `LOAD_REVIEWS`,
  LOAD_NEARBY_OFFERS: `LOAD_NEARBY_OFFERS`,
  LOAD_FAVORITE_OFFERS: `LOAD_FAVORITE_OFFERS`,
  LOGIN: `LOGIN`,
  CHECK_AUTH: `CHECK_AUTH`,
  SEND_FAVORITE_OFFER: `SEND_FAVORITE_OFFER`,
};

export const ErrorCode = {
  UNAUTHORIZED: 401,
  NO_DATA: 404,
};

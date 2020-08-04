import {extend} from '../../utils/common.js';

import {createOffers} from '../../adapters/offers.js';
import {createReviews} from '../../adapters/reviews.js';
import {ActionCreator as AppActionCreator} from '../../reducer/state-application/state-application.js';
import history from '../../history.js';
import {AppRoute} from '../../const.js';

const getDefaultActiveCity = (offersData) => {
  if (offersData.length === 0) {
    return false;
  }
  return offersData[0].city.name;
};

const updateData = (newOffer, offers) => {
  const oferIndex = offers.findIndex((offer) => offer.id === newOffer.id);
  const newOffers = [].concat(
    ...offers.slice(0, oferIndex),
    newOffer,
    ...offers.slice(oferIndex + 1, offers.length)
  );
  return newOffers;
};

const initialState = {
  offers: [],
  nearbyOffers: [],
};

const ActionType = {
  LOAD_OFFERS: `LOAD_OFFERS`,
  LOAD_REVIEWS: `LOAD_REVIEWS`,
  LOAD_NEARBY_OFFERS: `LOAD_NEARBY_OFFERS`,
  LOAD_FAVORITE_OFFERS: `LOAD_FAVORITE_OFFERS`,
  UPDATE_OFFERS: `UPDATE_OFFERS`,
  // UPDATE_FAVORITE_OFFERS: `UPDATE_FAVORITE_OFFERS`,
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
  loadFavoriteOffers: (favoriteOffersData) => ({
    type: ActionType.LOAD_FAVORITE_OFFERS,
    payload: favoriteOffersData,
  }),
  updateOffers: (offerData) => ({
    type: ActionType.UPDATE_OFFERS,
    payload: offerData,
  }),
  // updateFavoriteOffers: (favoriteOfferData) => ({
  //   type: ActionType.UPDATE_FAVORITE_OFFERS,
  //   payload: favoriteOfferData,
  // }),
};

const Operation = {
  loadOffers: () => (dispatch, getState, api) => {
    return api.get(`/hotels`).then((response) => {
      const offersData = createOffers(response.data);
      dispatch(ActionCreator.loadOffers(offersData));
      dispatch(
        AppActionCreator.changeActiveCity(getDefaultActiveCity(offersData))
      );
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

  sendReview: (id, newReview) => (dispatch, getState, api) => {
    return api
      .post(`/comments/${id}`, {
        comment: newReview.comment,
        rating: newReview.rating,
      })
      .then((response) => {
        dispatch(ActionCreator.loadReviews(createReviews(response.data)));
        return response;
      });
  },

  loadFavoriteOffers: () => (dispatch, getState, api) => {
    return api.get(`/favorite`).then((response) => {
      console.log(response);
      dispatch(ActionCreator.loadFavoriteOffers(createOffers(response.data)));
    });
  },

  sendFavoriteOffer: (id, isBookmark) => (dispatch, getState, api) => {
    const status = Number(!isBookmark);

    return api
      .post(`/favorite/${id}/${status}`)
      .then((response) => {
        dispatch(ActionCreator.updateOffers(createOffers([response.data])[0]));
        // dispatch(
        //   ActionCreator.updateFavoriteOffers(createOffers([response.data])[0])
        // );
        return response;
      })
      .catch((err) => {
        if (err.response.status === 401) {
          history.push(AppRoute.SING_IN);
        }
        // throw err;
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
    case ActionType.LOAD_FAVORITE_OFFERS:
      return extend(state, {favoriteOffers: action.payload});
    case ActionType.UPDATE_OFFERS:
      const newOffers = updateData(action.payload, state.offers);
      return extend(state, {offers: newOffers});
    // case ActionType.UPDATE_FAVORITE_OFFERS:
    //   const newFavoriteOffers = updateData(
    //     action.payload,
    //     state.favoriteOffers
    //   );
    //   return extend(state, {favoriteOffers: newFavoriteOffers});
  }
  return state;
};

export {reducer, ActionType, ActionCreator, Operation};

import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../api.js';

import {offers, originOffers} from '../../mocks-test/offers.js';
import {reviews, originReviews} from '../../mocks-test/reviews.js';

import {reducer, ActionType, ActionCreator, Operation} from './data.js';
import {ErrReason} from '../../const.js';

const resetErr = jest.fn();
const api = createAPI(
  () => {},
  () => {},
  resetErr
);

const newReviewMessage = `a`.repeat(100);

const mockNewReview = {
  comment: newReviewMessage,
  rating: '12345678',
};

const initialState = {
  offers: [],
  reviews: [],
  nearbyOffers: [],
  favoriteOffers: [],
  errReason: false,
  errMessage: ``,
};

const updateOffersData = (newOffer, oldOffers) => {
  const oferIndex = oldOffers.findIndex((offer) => offer.id === newOffer.id);
  const newOffers = [].concat(
    ...oldOffers.slice(0, oferIndex),
    newOffer,
    ...oldOffers.slice(oferIndex + 1, offers.length)
  );
  return newOffers;
};

const updateFavoriteOffersData = (newOffer, oldOffers) => {
  if (newOffer.isBookmark) {
    return [].concat(oldOffers, newOffer);
  }
  return oldOffers.filter((offer) => offer.id !== newOffer.id);
};

describe(`Data_test`, () => {
  it(`ReducerData_without_additional_parameters_should_return_initial_state`, () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });
  it(`ReducerData_should_update_Offers_by_loadOffers`, () => {
    expect(
      reducer(initialState, {
        type: ActionType.LOAD_OFFERS,
        payload: offers,
      })
    ).toEqual(Object.assign({}, initialState, {offers}));
  });
  it(`ReducerData_should_update_Reviews_by_loadReviews`, () => {
    expect(
      reducer(initialState, {
        type: ActionType.LOAD_REVIEWS,
        payload: reviews,
      })
    ).toEqual(Object.assign({}, initialState, {reviews}));
  });
  it(`ReducerData_should_update_NearbyOffers_by_loadNearbyOffers`, () => {
    expect(
      reducer(initialState, {
        type: ActionType.LOAD_NEARBY_OFFERS,
        payload: offers[0],
      })
    ).toEqual(Object.assign({}, initialState, {nearbyOffers: offers[0]}));
  });
  it(`ReducerData_should_update_favoriteOffers_by_loadFavoriteOffers`, () => {
    expect(
      reducer(initialState, {
        type: ActionType.LOAD_FAVORITE_OFFERS,
        payload: offers,
      })
    ).toEqual(Object.assign({}, initialState, {favoriteOffers: offers}));
  });
  it(`ReducerData_should_update_Offers_by_updateOffers`, () => {
    const newOffer = Object.assign({}, offers[0], {
      isBookmark: !offers[0].isBookmark,
    });
    const newOffers = updateOffersData(newOffer, offers);
    expect(
      reducer(Object.assign({}, initialState, {offers}), {
        type: ActionType.UPDATE_OFFERS,
        payload: newOffer,
      })
    ).toEqual(Object.assign({}, initialState, {offers: newOffers}));
  });
  it(`ReducerData_should_update_favoriteOffers_by_updateFavoriteOffers`, () => {
    const newOffer = Object.assign({}, offers[0], {
      isBookmark: !offers[0].isBookmark,
    });
    const newOffers = updateFavoriteOffersData(newOffer, offers);
    expect(
      reducer(Object.assign({}, initialState, {favoriteOffers: offers}), {
        type: ActionType.UPDATE_FAVORITE_OFFERS,
        payload: newOffer,
      })
    ).toEqual(Object.assign({}, initialState, {favoriteOffers: newOffers}));
  });
  it(`ReducerData_should_update_errReason_by_changeErrReason`, () => {
    expect(
      reducer(Object.assign({}, initialState), {
        type: ActionType.CHANGE_ERR_REASON,
        payload: ErrReason.LOAD_REVIEWS,
      })
    ).toEqual(
      Object.assign({}, initialState, {errReason: ErrReason.LOAD_REVIEWS})
    );
  });
  it(`ReducerData_should_update_errMessage_by_changeErrMessage`, () => {
    expect(
      reducer(Object.assign({}, initialState), {
        type: ActionType.CHANGE_ERR_MESSAGE,
        payload: `abcd`,
      })
    ).toEqual(Object.assign({}, initialState, {errMessage: `abcd`}));
  });
});

describe(`DataActionCreators_work_correctly`, () => {
  it(`DataActionCreator_for_loadOffers`, function () {
    expect(ActionCreator.loadOffers(offers)).toEqual({
      type: ActionType.LOAD_OFFERS,
      payload: offers,
    });
  });
  it(`DataActionCreator_for_loadReviews`, function () {
    expect(ActionCreator.loadReviews(reviews)).toEqual({
      type: ActionType.LOAD_REVIEWS,
      payload: reviews,
    });
  });
  it(`DataActionCreator_for_loadNearbyOffers`, function () {
    expect(ActionCreator.loadNearbyOffers(offers[0])).toEqual({
      type: ActionType.LOAD_NEARBY_OFFERS,
      payload: offers[0],
    });
  });
  it(`DataActionCreator_for_loadNearbyOffers`, function () {
    expect(ActionCreator.loadNearbyOffers(offers[0])).toEqual({
      type: ActionType.LOAD_NEARBY_OFFERS,
      payload: offers[0],
    });
  });
  it(`DataActionCreator_for_loadFavoriteOffers`, function () {
    expect(ActionCreator.loadFavoriteOffers(offers)).toEqual({
      type: ActionType.LOAD_FAVORITE_OFFERS,
      payload: offers,
    });
  });
  it(`DataActionCreator_for_updateOffers`, function () {
    expect(ActionCreator.updateOffers(offers[0])).toEqual({
      type: ActionType.UPDATE_OFFERS,
      payload: offers[0],
    });
  });
  it(`DataActionCreator_for_updateFavoriteOffers`, function () {
    expect(ActionCreator.updateFavoriteOffers(offers[0])).toEqual({
      type: ActionType.UPDATE_FAVORITE_OFFERS,
      payload: offers[0],
    });
  });
  it(`DataActionCreator_for_changeErrReason`, function () {
    expect(ActionCreator.changeErrReason(ErrReason.LOAD_REVIEWS)).toEqual({
      type: ActionType.CHANGE_ERR_REASON,
      payload: ErrReason.LOAD_REVIEWS,
    });
  });
  it(`DataActionCreator_for_changeErrMessage`, function () {
    expect(ActionCreator.changeErrMessage(`abcd`)).toEqual({
      type: ActionType.CHANGE_ERR_MESSAGE,
      payload: `abcd`,
    });
  });
});

describe(`DataOperation_work_correctly`, () => {
  it(`DataOperation_should_make_a_correct_API_call_to_Offers`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const offersLoader = Operation.loadOffers();

    apiMock.onGet(`/hotels`).reply(200, originOffers);

    return offersLoader(dispatch, () => {}, api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.LOAD_OFFERS,
        payload: [offers[0]],
      });
    });
  });

  it(`DataOperation_should_make_a_correct_API_call_to_Reviews`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const id = 1;
    const reviewsLoader = Operation.loadReviews(id);

    apiMock.onGet(`/comments/${id}`).reply(200, originReviews);

    return reviewsLoader(dispatch, () => {}, api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.LOAD_REVIEWS,
        payload: reviews,
      });
    });
  });

  it(`DataOperation_should_make_a_correct_API_call_to_NearbyOffers`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const id = 1;
    const nearbyOffersLoader = Operation.loadNearbyOffers(id);

    apiMock.onGet(`/hotels/${id}/nearby`).reply(200, originOffers);

    return nearbyOffersLoader(dispatch, () => {}, api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.LOAD_NEARBY_OFFERS,
        payload: [offers[0]],
      });
    });
  });

  it(`DataOperation_should_make_a_correct_API_call_to_send_Review`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const id = 1;
    const reviewSender = Operation.sendReview(id, mockNewReview);

    apiMock.onPost(`/comments/${id}`).reply(200, originReviews);

    return reviewSender(dispatch, () => {}, api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.LOAD_REVIEWS,
        payload: reviews,
      });
    });
  });

  it(`DataOperation_should_make_a_correct_API_call_to_FavoriteOffers`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const favoriteOffersLoader = Operation.loadFavoriteOffers();

    apiMock.onGet(`/favorite`).reply(200, originOffers);

    return favoriteOffersLoader(dispatch, () => {}, api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.LOAD_FAVORITE_OFFERS,
        payload: [offers[0]],
      });
    });
  });

  it(`DataOperation_should_make_a_correct_API_call_to_send_FavoriteOffer`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const id = 1;
    const status = 0;
    const getState = () => {
      return {DATA: {favoriteOffers: [offers[0]]}};
    };
    const favoriteOfferSender = Operation.sendFavoriteOffer(id, true);

    apiMock.onPost(`/favorite/${id}/${status}`).reply(200, originOffers[0]);

    return favoriteOfferSender(dispatch, getState, api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(2);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.UPDATE_OFFERS,
        payload: offers[0],
      });
      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: ActionType.UPDATE_FAVORITE_OFFERS,
        payload: offers[0],
      });
    });
  });

  it(`DataOperation_should_make_a_correct_API_call_to_send_FavoriteOffer_without_updateFavoriteOffers`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const id = 1;
    const status = 0;
    const getState = () => {
      return {DATA: {favoriteOffers: []}};
    };
    const favoriteOfferSender = Operation.sendFavoriteOffer(id, true);

    apiMock.onPost(`/favorite/${id}/${status}`).reply(200, originOffers[0]);

    return favoriteOfferSender(dispatch, getState, api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.UPDATE_OFFERS,
        payload: offers[0],
      });
    });
  });
});

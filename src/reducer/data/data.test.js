import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../api.js';

import {offers, originOffers} from '../../mocks-test/offers.js';
import {reviews} from '../../mocks-test/reviews.js';

import {reducer, ActionType, ActionCreator, Operation} from './data.js';

const api = createAPI(() => {});

const initialState = {
  offers: [],
  nearbyOffers: [],
};

describe(`Data_test`, () => {
  it(`ReducerData_without_additional_parameters_should_return_initial_state`, () => {
    expect(reducer(undefined, {})).toEqual({
      offers: [],
      nearbyOffers: [],
    });
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
});

describe(`Operation_work_correctly`, () => {
  it(`Should_make_a_correct_API_call_to_Offers`, function () {
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
});

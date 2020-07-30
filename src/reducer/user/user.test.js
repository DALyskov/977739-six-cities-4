import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../api.js';

import {AuthorizationStatus} from '../../const.js';

import {reducer, ActionType, ActionCreator, Operation} from './user.js';

const api = createAPI(() => {});

const mockData = {
  'email': 'a@mail.ru',
  'password': '12345678',
};

const initialState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  userEmail: false,
};

describe(`UserReducer_test`, () => {
  it(`UserReducer_without_additional_parameters_should_return_initial_state`, () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it(`UserReducer_should_change_authorizationStatus_and_return_userEmail`, () => {
    expect(
      reducer(initialState, {
        type: ActionType.REQUIRED_AUTHORIZATION,
        payload: {
          authorizationStatus: AuthorizationStatus.AUTH,
          userEmail: `a@mail.ru`,
        },
      })
    ).toEqual(
      Object.assign({}, initialState, {
        authorizationStatus: AuthorizationStatus.AUTH,
        userEmail: `a@mail.ru`,
      })
    );
  });
});

describe(`UserReducer_work_correctly`, () => {
  it(`UserReducer_for_requireAuthorization`, function () {
    expect(
      ActionCreator.requireAuthorization(AuthorizationStatus.AUTH, `a@mail.ru`)
    ).toEqual({
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: {
        authorizationStatus: AuthorizationStatus.AUTH,
        userEmail: `a@mail.ru`,
      },
    });
  });
});

describe(`UserOperation_work_correctly`, () => {
  it(`UserOperation_should_make_a_correct_API_checkAuth`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const authChecker = Operation.checkAuth();

    apiMock.onGet(`/login`).reply(200, mockData);

    return authChecker(dispatch, () => {}, api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.REQUIRED_AUTHORIZATION,
        payload: {
          authorizationStatus: AuthorizationStatus.AUTH,
          userEmail: `a@mail.ru`,
        },
      });
    });
  });

  it(`UserOperation_should_make_a_correct_API_login`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const login = Operation.login(mockData);

    apiMock.onPost(`/login`).reply(200, mockData);

    return login(dispatch, () => {}, api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.REQUIRED_AUTHORIZATION,
        payload: {
          authorizationStatus: AuthorizationStatus.AUTH,
          userEmail: `a@mail.ru`,
        },
      });
    });
  });
});

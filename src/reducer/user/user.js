import history from '../../history.js';

import {extend} from '../../utils/common.js';
import {
  AuthorizationStatus,
  ErrReason,
  AppRoute,
  ErrorCode,
} from '../../const.js';

import {ActionCreator as DataActionCreator} from '../data/data.js';

const initialState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  userEmail: false,
};

const ActionType = {
  REQUIRED_AUTHORIZATION: `REQUIRED_AUTHORIZATION`,
};

const ActionCreator = {
  requireAuthorization: (authorizationStatus, userEmail = false) => ({
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: {authorizationStatus, userEmail},
  }),
};

const Operation = {
  checkAuth: () => (dispatch, getState, api) => {
    return api
      .get(`/login`)
      .then((data) => {
        dispatch(
          ActionCreator.requireAuthorization(
            AuthorizationStatus.AUTH,
            data.data.email
          )
        );
        return;
      })
      .catch((err) => {
        dispatch(DataActionCreator.changeErrReason(ErrReason.CHECK_AUTH));
        if (
          err.response.status !== ErrorCode.NO_DATA &&
          history.location.pathname === AppRoute.FAVORITES
        ) {
          history.push(AppRoute.SING_IN);
        }
      });
  },

  login: (authData) => (dispatch, getState, api) => {
    return api
      .post(`/login`, {
        email: authData.login,
        password: authData.password,
      })
      .then((data) => {
        dispatch(
          ActionCreator.requireAuthorization(
            AuthorizationStatus.AUTH,
            data.data.email
          )
        );
      })
      .catch(() => {
        dispatch(DataActionCreator.changeErrReason(ErrReason.LOGIN));
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REQUIRED_AUTHORIZATION:
      return extend(state, {
        authorizationStatus: action.payload.authorizationStatus,
        userEmail: action.payload.userEmail,
      });
  }
  return state;
};

export {ActionCreator, ActionType, Operation, reducer};

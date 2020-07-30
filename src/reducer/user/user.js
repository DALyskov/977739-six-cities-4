import {extend} from '../../utils/common.js';
import {AuthorizationStatus} from '../../const.js';

const initialState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  userEmail: false,
};

const ActionType = {
  REQUIRED_AUTHORIZATION: `REQUIRED_AUTHORIZATION`,
};

const ActionCreator = {
  requireAuthorization: (authorizationStatus, userEmail = false) => {
    return {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: {authorizationStatus, userEmail},
    };
  },
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
      })
      .catch((err) => {
        throw err;
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
      .catch((err) => {
        throw err;
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

export {ActionCreator, ActionType, AuthorizationStatus, Operation, reducer};

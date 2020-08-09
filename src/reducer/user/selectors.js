import NameSpace from '../name-space.js';

export const getAuthorizationStatus = (state) => {
  return state[NameSpace.USER].authorizationStatus;
};

export const getUserEmail = (state) => {
  return state[NameSpace.USER].userEmail;
};

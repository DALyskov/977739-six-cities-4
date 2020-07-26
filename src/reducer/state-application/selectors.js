import NameSpace from '../name-space.js';

export const getSotringType = (state) => {
  return state[NameSpace.STATE_APPLICATION].sotringType;
};

export const getHoverCityId = (state) => {
  return state[NameSpace.STATE_APPLICATION].hoverCityId;
};

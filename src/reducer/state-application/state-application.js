import {sotringItems} from '../../const.js';
import {extend} from '../../utils/common.js';

const initialState = {
  sotringType: sotringItems[0],
  hoverCityId: false,
};

const ActionType = {
  CHANGE_SOTRING_TYPE: `CHANGE_SOTRING_TYPE`,
  CHANGE_HOVER_CITY_ID: `CHANGE_HOVER_CITY_ID`,
};

const ActionCreator = {
  changeSotringType: (sotringType) => ({
    type: ActionType.CHANGE_SOTRING_TYPE,
    payload: sotringType,
  }),
  changeHoverCityId: (placeDataId) => ({
    type: ActionType.CHANGE_HOVER_CITY_ID,
    payload: placeDataId,
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_SOTRING_TYPE:
      return extend(state, {sotringType: action.payload});
    case ActionType.CHANGE_HOVER_CITY_ID:
      return extend(state, {hoverCityId: action.payload});
  }
  return state;
};

export {reducer, ActionType, ActionCreator};

import {combineReducers} from 'redux';

import {reducer as data} from './data/data.js';
import {reducer as stateApplication} from './state-application/state-application.js';

import NameSpace from './name-space.js';

export default combineReducers({
  [NameSpace.DATA]: data,
  [NameSpace.STATE_APPLICATION]: stateApplication,
});

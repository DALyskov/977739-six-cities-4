import {combineReducers} from 'redux';

import NameSpace from './name-space.js';
import {reducer as data} from './data/data.js';
import {reducer as stateApplication} from './state-application/state-application.js';
import {reducer as user} from './user/user.js';

export default combineReducers({
  [NameSpace.DATA]: data,
  [NameSpace.STATE_APPLICATION]: stateApplication,
  [NameSpace.USER]: user,
});

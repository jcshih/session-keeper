import { combineReducers } from 'redux';

import currentWindows from './currentWindows';
import sessions from './sessions';
import filter from './filter';

const rootReducer = combineReducers({
  currentWindows,
  sessions,
  filter
});

export default rootReducer;

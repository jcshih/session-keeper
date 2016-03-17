import { combineReducers } from 'redux';

import currentWindows from './currentWindows';
import sessions from './sessions';

const rootReducer = combineReducers({
  currentWindows,
  sessions
});

export default rootReducer;

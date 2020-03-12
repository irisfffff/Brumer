import {combineReducers} from 'redux';
import timersReducer from '../reducers/timerReducer';

export default combineReducers({
  timers: timersReducer,
});
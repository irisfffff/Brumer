import {FETCH_TIMERS, EDIT_TIMER, NEW_TIMER, SAVE_TIMER, DELETE_TIMER} from './types';



export const fetchTimers = () => dispatch => dispatch({
    type: FETCH_TIMERS,
    payload: data,
  });

export const editTimer = (timer) => dispatch => dispatch({
  type: EDIT_TIMER,
  payload: timer,
});

export const createTimer = (timer) => dispatch => dispatch({
  type: NEW_TIMER,
  payload: timer,
});

export const saveTimer = (timer) => dispatch => dispatch({
  type: SAVE_TIMER,
  payload: timer,
});

export const deleteTimer = (timer) => dispatch => dispatch({
  type: DELETE_TIMER,
  payload: timer,
});
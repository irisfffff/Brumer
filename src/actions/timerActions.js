import {FETCH_TIMERS, EDIT_TIMER, NEW_TIMER, SAVE_TIMER, DELETE_TIMER, RUN_TIMER, PAUSE_TIMER, RESUME_TIMER, COUNTDOWN} from './types';

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

export const runTimer = (timer) => dispatch => dispatch({
  type: RUN_TIMER,
  payload: timer,
});

export const pauseTimer = () => dispatch => dispatch({
  type: PAUSE_TIMER,
  payload: false,
});

export const resumeTimer = (timeLeft) => dispatch => dispatch({
  type: RESUME_TIMER,
  payload: timeLeft,
});

export const countdown = (sum) => dispatch => dispatch({
  type: COUNTDOWN,
  payload: sum,
});
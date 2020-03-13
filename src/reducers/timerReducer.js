import {FETCH_TIMERS, EDIT_TIMER, NEW_TIMER, SAVE_TIMER, DELETE_TIMER, RUN_TIMER, COUNTDOWN} from '../actions/types';

const data = [
  {
    id: 'dfaf84cb-9303-4a70-a6e6-c4428818fcda',
    name: 'Press a coffee',
    sum: [0, 9, 10],
    sequence: [
      {
        id: '_8qh810n7v',
        title: 'Brew',
        time: [0, 4, 0],
        ifPause: true,
        pauseTime: [0, 0, 10],
      },
      {
        id: '_m3s8649hy',
        title: 'Cool Down',
        time: [0, 5, 0],
        ifPause: false,
        pauseTime: [0, 0, 0],
      },
    ]
  },
  {
    id: '43484dcc-c377-43fa-ad7e-91a06c10a06d',
    name: 'Laundry',
    sum: [2, 0, 0],
    sequence: [
      {
        id: '_h3nk5srsh',
        title: 'Wash',
        time: [0, 50, 0],
        ifPause: true,
        pauseTime: [0, 10, 0],
      },
      {
        id: '_2czkcl1o6',
        title: 'Dry',
        time: [1, 0, 0],
        ifPause: false,
        pauseTime: [0, 0, 0],
      },
    ]
  },
  {
    id: 'abada948-937e-4e97-92e5-f4110fda0df9',
    name: 'Boil an egg',
    sum: [0, 6, 0],
    sequence: [
      {
        id: '_oafe30mzc',
        title: 'Default',
        time: [0, 6, 0],
        ifPause: false,
        pauseTime: [0, 0, 0],
      },
    ]
  },
]

const initialState = {
  items: [...data],
  item: undefined,
  runningItem: undefined,
  timeLeft: [0, 0, 0],
}

export default function(state = initialState, action) {
  let newItems = [...state.items];
  switch(action.type) {
    case FETCH_TIMERS:
      return {
        ...state,
      };
    case EDIT_TIMER:
      return {
        ...state,
        item: action.payload,
      };
    case NEW_TIMER:
      return {
        ...state,
        items: newItems.concat([action.payload]),
        item: undefined,
      };
    case SAVE_TIMER:
      newItems.splice(state.items.findIndex(item => item.id == action.payload.id), 1, action.payload)
      return {
        ...state,
        items: newItems,
        item: undefined,
      };
    case DELETE_TIMER:
      return {
        ...state,
        items: newItems.filter(item => item.id != action.payload),
      };
    case RUN_TIMER:
      return {
        ...state,
        runningItem: action.payload,
        timeLeft: action.payload ? action.payload.sum : [0, 0, 0],
      };
    case COUNTDOWN:
      return {
        ...state,
        timeLeft: action.payload,
      };
    default:
      return state;
  }
}
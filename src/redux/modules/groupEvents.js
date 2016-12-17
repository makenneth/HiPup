import axios from "axios";

const FETCH = 'hp/groupsEvents/FETCH';
const FETCH_SUCCESS = 'hp/groupsEvents/FETCH_SUCCESS';
const FETCH_FAIL = 'hp/groupsEvents/FETCH_FAIL';

const initialState = {
  groupEvents: [],
  error: null,
  endReached: false,
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH:
      return {
        ...state,
        loading: true
      };
    case FETCH_SUCCESS: {
      const events = action.payload;
      let endReached = false;
      if (events.length < 10) {
        endReached = true;
      }
      return {
        ...state,
        endReached,
        loading: false,
        groupEvents: [...state.groupEvents, ...events]
      };
    }
    case FETCH_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    default:
      return state;
  }
};

export const fetchGroupEvents = (start, end) => {
  return {
    types: [FETCH, FETCH_SUCCESS, FETCH_FAIL],
    promise: axios.get(`/api/group_events?query=time&start=${start}&end=${end}`)
  };
};

export const areAllFetched = (state) => {
  return state.groupEvents.ended;
};
import axios from 'axios';
import { fromJS } from 'immutable';
import { Request } from 'helpers';

const FETCH = 'hp/groupsEvents/FETCH';
const FETCH_SUCCESS = 'hp/groupsEvents/FETCH_SUCCESS';
const FETCH_FAIL = 'hp/groupsEvents/FETCH_FAIL';

const initialState = fromJS({
  groupEvents: [],
  error: null,
  endReached: false,
  loading: false,
});

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH:
      return state.set('loading', true);
    case FETCH_SUCCESS: {
      const events = action.payload;
      let endReached = false;
      if (events.length < 10) {
        endReached = true;
      }

      //can you do spread operator on list?
      return state.merge({
        endReached,
        loading: false,
        groupEvents: [...state.groupEvents, ...events],
      });
    }
    case FETCH_FAIL:
      return state.merge({
        loading: false,
        error: action.payload,
      });
    default:
      return state;
  }
};

export const fetchGroupEvents = (start, end) => {
  return {
    types: [FETCH, FETCH_SUCCESS, FETCH_FAIL],
    promise: new Request(`/api/group_events?query=time&start=${start}&end=${end}`).send(),
  };
};

export const areAllFetched = (state) => {
  return state.groupEvents.ended;
};
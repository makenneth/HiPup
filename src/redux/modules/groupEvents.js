import { fromJS } from 'immutable';
import { Request } from 'helpers';

export const FETCH_EVENTS = 'hp/groupEvents/FETCH';
export const FETCH_EVENTS_SUCCESS = 'hp/groupEvents/FETCH_SUCCESS';
export const FETCH_EVENTS_FAIL = 'hp/groupEvents/FETCH_FAIL';

const initialState = fromJS({
  groupEvents: [],
  error: null,
  endReached: false,
  loading: false,
  loaded: false,
});

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EVENTS:
      return state.set('loading', true);
    case FETCH_EVENTS_SUCCESS: {
      const events = action.payload.groupEvents.map(groupEvent => fromJS(groupEvent));
      let endReached = false;
      if (events.length < 10) {
        endReached = true;
      }
      return state.merge({
        endReached,
        loading: false,
        loaded: true,
        groupEvents: state.get('groupEvents').push(...events),
      });
    }
    case FETCH_EVENTS_FAIL:
      return state.merge({
        loading: false,
        loaded: true,
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
  return state.get('endReached');
};

export const isLoaded = (state) => {
  return state.get('loaded');
};
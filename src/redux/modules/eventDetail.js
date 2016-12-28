import { fromJS } from 'immutable';
import { Request } from 'helpers';

const FETCH = 'hp/eventDetail/FETCH';
const FETCH_SUCCESS = 'hp/eventDetail/FETCH_SUCCESS';
const FETCH_FAIL = 'hp/eventDetail/FETCH_FAIL';
const RSVP_CHANGED = 'hp/eventDetail/RSVP_CHANGED';
const SET_EVENT = 'hp/eventDetail/SET_EVENT';

const initialState = fromJS({
  groupEvent: null,
  cached: {},
  error: null,
  loading: false,
  loaded: false,
});

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH:
      return state.set('loading', true);
    case FETCH_SUCCESS: {
      return state.merge({
        loading: false,
        loaded: true,
        groupEvents: fromJS(action.payload),
      });
    }
    case RSVP_CHANGED: {
      //
      return state.setIn(['groupEvent', 'event_users'], );
    }
    case FETCH_FAIL:
      return state.merge({
        loading: false,
        loaded: true,
        error: action.payload,
      });
    case SET_EVENT:
      return state.set('groupEvent', state.getIn(['cached', action.payload]))
    default:
      return state;
  }
};

export const fetchGroupEvent = (id) => {
  return {
    types: [FETCH, FETCH_SUCCESS, FETCH_FAIL],
    promise: new Request(`/api/group_events/${id}`).send(),
  };
};

export const rsvpEvent = () => {
  return {
    types: ['???', RSVP_CHANGED, '???'],
    promise: new Request(`/api/event_users/${id}`, 'POST', {}),
  };
};

export const changeRSVP = () => {
  return {
    types: ['???', RSVP_CHANGED, '???'],
    promise: new Request(`/api/event_users/${id}`, 'DELETE', {}),
  };
};

export const setEvent = (id) => {
  return {
    type: SET_EVENT,
    payload: id,
  };
};

export const isCached = (state, id) => {
  return state.getIn(['cached', 'id']);
};

export const hasLoaded = (state, id) => {
  return state.get('groupEvent') &&
    state.getIn(['groupEvent', 'id']) === id;
};
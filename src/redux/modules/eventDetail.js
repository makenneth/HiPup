import { fromJS } from 'immutable';
import { Request } from 'helpers';

const FETCH = 'hp/eventDetail/FETCH';
const FETCH_SUCCESS = 'hp/eventDetail/FETCH_SUCCESS';
const FETCH_FAIL = 'hp/eventDetail/FETCH_FAIL';
export const RSVP_REMOVED = 'hp/eventDetail/RSVP_REMOVED';
export const RSVP_ADDED = 'hp/eventDetail/RSVP_ADDED';
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
      const groupEvent = state.get('groupEvent');
      if (Boolean(groupEvent)) {
        return state.merge({
          loading: false,
          loaded: true,
          cached: state.setIn(['cached', groupEvent.get('id')], groupEvent),
          groupEvent: fromJS(action.payload),
        });
      }
      return state.merge({
        loading: false,
        loaded: true,
        groupEvent: fromJS(action.payload),
      });
    }
    case RSVP_ADDED: {
      return state.updateIn(['groupEvent' , 'eventUsers'], arr => arr.push(fromJS(action.payload)));
    }
    case RSVP_REMOVED: {
      const delIdx = state.getIn(['groupEvent', 'eventUsers'])
        .findIndex(u => u.get('id') === action.payload.id);
      return state.updateIn(['groupEvent' , 'eventUsers'], arr => arr.delete(delIdx));
    }
    case FETCH_FAIL:
      return state.merge({
        loading: false,
        loaded: true,
        error: action.payload,
      });
    case SET_EVENT: {
      const groupEvent = state.get('groupEvent');
      if (Boolean(groupEvent)) {
        return state.merge({
          cached: state.cached.set(groupEvent.get('id'), groupEvent),
          groupEvent: state.getIn(['cached', action.payload]),
        });
      }
      return state.set('groupEvent', state.getIn(['cached', action.payload]))
    }
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

export const rsvpEvent = (event_id) => {
  return {
    types: ['???', RSVP_ADDED, '???'],
    promise: new Request('/api/event_users', 'POST', {
      event_id,
    }).send(),
  };
};

export const removeRSVP = (event_id) => {
  return {
    types: ['???', RSVP_REMOVED, '???'],
    promise: new Request(`/api/event_users/${event_id}`, 'DELETE', {}).send(),
  };
};

export const setEvent = (id) => {
  return {
    type: SET_EVENT,
    payload: id,
  };
};

export const isCached = (state, id) => {
  return state.get('cached') && state.getIn(['cached', 'id']);
};

export const hasLoaded = (state, id) => {
  return state.get('groupEvent') &&
    state.getIn(['groupEvent', 'id']) === id;
};

import Immutable, { fromJS } from 'immutable';
import { Request } from 'helpers';
import { RSVP_REMOVED, RSVP_ADDED } from './eventDetail';
import { JOINED_GROUP, LEFT_GROUP } from './group';

const LOAD_AUTH = 'mp/auth/LOAD_AUTH';
const LOAD_AUTH_ERROR = 'mp/auth/LOAD_AUTH_ERROR';
export const LOAD_AUTH_SUCCESS = 'mp/auth/LOAD_AUTH_SUCCESS';
const LOGOUT_SUCCESS = 'mp/auth/LOGOUT_SUCCESS';
const LOGOUT_FAIL = 'mp/auth/LOGOUT_FAIL';

const initialState = fromJS({
  user: null,
  error: null,
  loading: false,
  loaded: false
});

export default (state = initialState, action) => {
  switch (action.type) {
    case RSVP_REMOVED:
    case RSVP_ADDED:
      return state.updateIn(['user', 'joinedEvents'], _ => fromJS(action.payload.joinedEvents));
    case JOINED_GROUP:
      return state.updateIn(['user', 'groups'], arr => arr.push(fromJS(action.payload.group)));
    case LEFT_GROUP:
      const delIdx = state.getIn(['user', 'groups']).findIndex(g => g.id === action.payload.groupId);
      return state.updateIn(['user', 'groups'], arr => arr.delete(delIdx));
    case LOAD_AUTH:
      return state.merge({
        loading: true,
        loaded: false,
      });
    case LOAD_AUTH_SUCCESS:
      return state.merge({
        user: action.payload,
        loading: false,
        loaded: true,
      });
    case LOAD_AUTH_ERROR:
      return state.merge({
        loading: false,
        loaded: true,
        error: typeof action.payload === 'object' ? 'Something went wrong' : action.payload,
      });
    case LOGOUT_SUCCESS:
      return state.set('user', null);
    default:
      return state;
  }
};


export const loadAuth = () => {
  return {
    types: [LOAD_AUTH, LOAD_AUTH_SUCCESS, LOAD_AUTH_ERROR],
    promise: new Request('/api/user').send(),
  };
};

export const isLoaded = (state) => {
  return state.auth.get('loaded');
};

export const logIn = (user) => {
  return {
    types: [LOAD_AUTH, LOAD_AUTH_SUCCESS, LOAD_AUTH_ERROR],
    promise: new Request('/api/session', 'POST', user).send(),
  };
};

export const signUp = (user) => {
  return {
    types: [LOAD_AUTH, LOAD_AUTH_SUCCESS, LOAD_AUTH_ERROR],
    promise: new Request('/api/user', 'POST', { user }).send(),
  };
};

export const logOut = () => {
  return {
    types: ["NOT NEEDED", LOGOUT_SUCCESS, LOGOUT_FAIL],
    promise: new Request('/api/session', 'DELETE').send(),
  };
};

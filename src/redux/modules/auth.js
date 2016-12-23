import Immutable, { fromJS } from 'immutable';
import { Request } from 'helpers';

const LOAD_AUTH = 'mp/auth/LOAD_AUTH';
const LOAD_AUTH_ERROR = 'mp/auth/LOAD_AUTH_ERROR';
export const LOAD_AUTH_SUCCESS = 'mp/auth/LOAD_AUTH_SUCCESS';
const LOGOUT_SUCCESS = 'mp/auth/LOGOUT_SUCCESS';
const LOGOUT_FAIL = 'mp/auth/LOGOUT_FAIL';

const initialState = fromJS({
  club: {},
  error: null,
  loading: false,
  loaded: false
});

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_AUTH:
      return state.merge({
        loading: true,
        loaded: false,
      });
    case LOAD_AUTH_SUCCESS:
      return state.merge({
        club: action.payload,
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
      return state.set('club', Immutable.Map());
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
  return state.loaded;
};

export const logIn = (user) => {
  return {
    types: [LOAD_AUTH, LOAD_AUTH_SUCCESS, LOAD_AUTH_ERROR],
    promise: new Request('/api/session/new', 'POST', user).send(),
  };
};

export const signUp = (user) => {
  return {
    types: [LOAD_AUTH, LOAD_AUTH_SUCCESS, LOAD_AUTH_ERROR],
    promise: new Request('/api/user/new', 'POST', user).send(),
  };
};

export const logOut = () => {
  return {
    types: ["NOT NEEDED", LOGOUT_SUCCESS, LOGOUT_FAIL],
    promise: new Request('/session', 'DELETE').send(),
  };
};

// export const clearError = () => {
//   return {
//     type: CLEAR_ERROR
//   };
// };

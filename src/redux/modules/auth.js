import axios from "axios";
import { getCSRF } from "helpers";

const LOAD_AUTH = "mp/auth/LOAD_AUTH";
const LOAD_AUTH_ERROR = "mp/auth/LOAD_AUTH_ERROR";
const LOAD_AUTH_SUCCESS = "mp/auth/LOAD_AUTH_SUCCESS";
const LOGOUT_SUCCESS = "mp/auth/LOGOUT_SUCCESS";
const LOGOUT_FAIL = "mp/auth/LOGOUT_FAIL";

const initialState = {
  club: {},
  error: null,
  loading: false,
  loaded: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_AUTH:
      return {
        ...state,
        loading: true,
      };
    case LOAD_AUTH_SUCCESS: {
      const club = {
        ...action.payload
      };
      return {
        ...state,
        club,
        loading: false,
        loaded: true
      };
    }
    case LOAD_AUTH_ERROR:
      return {
        ...state,
        loading: false,
        loaded: true,
        error: typeof action.payload === "object" ? "Something went wrong" : action.payload
      };
    case LOGOUT_LOAD:
      return {
        ...state,
        loaded: false,
        club: {}
      };
    default:
      return state;
  }
};


export const loadAuth = () => {
  const promise = axios.get("/api/user");

  return {
    types: [LOAD_AUTH, LOAD_AUTH_SUCCESS, LOAD_AUTH_ERROR],
    promise
  };
};

export const isAuthLoaded = (state) => {
  return state.loaded;
};

export const logIn = (user) => {
  const promise = axios({
    method: "POST",
    url: "/api/session/new",
    data: { user },
    headers: {
      "X-CSRF-TOKEN": getCSRF()
    }
  });

  return {
    types: [LOAD_AUTH, LOAD_AUTH_SUCCESS, LOAD_AUTH_ERROR],
    promise
  };
};

export const signUp = (user) => {
  const promise = axios({
    method: "POST",
    url: "/api/user/new",
    data: { user },
    headers: {
      "X-CSRF-TOKEN": getCSRF()
    }
  });

  return {
    types: [LOAD_AUTH, LOAD_AUTH_SUCCESS, LOAD_AUTH_ERROR],
    promise
  };
};

export const logOut = () => {
  return {
    types: [LOGOUT_LOAD, LOGOUT_SUCCESS, LOGOUT_FAIL],
    promise: axios.delete("/session")
  };
};

// export const clearError = () => {
//   return {
//     type: CLEAR_ERROR
//   };
// };

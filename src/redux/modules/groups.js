import axios from "axios";

const SET_RANGE = "hp/groups/SET_RANGE";

const initialState = {
  loading: false,
  loaded: false,
  groups: [],
  groupQuery: {},
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_RANGE:
      return {
        ...state,
        miles: action.payload
      };
    case FETCH_GROUPS:
      return {
        ...state,
        loading: true
      };
    case FETCHED_GROUPS:
      return {
        ...state,
        groups: action.payload,
        loading: false,
        loaded: true
      };
    case FETCH_GROUP_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
        loaded: true
      };
    default:
      return state;
  }
};

export const fetchGroups = () => {
  return {
    types: [FETCH_GROUPS, FETCHED_GROUPS, FETCH_GROUP_ERROR],
    promise: axios.get("/api/groups")
  };
};

export const isLoaded = (state) => {
  return state.groups.loaded;
};

export const setRange = (range) => {
  return {
    type: SET_RANGE,
    payload: range
  };
};
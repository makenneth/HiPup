import axios from "axios";

const initialState = () => {
  loading: false,
  loaded: false,
  groups: [],
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
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

export const fetchAllGroups = () => {
  return {
    types: [FETCH_GROUPS, FETCHED_GROUPS, FETCH_GROUP_ERROR],
    promise: axios.get("/api/groups")
  };
};
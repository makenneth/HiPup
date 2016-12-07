import axios from "axios";

const LOAD_TAGS = "hp/tags/LOAD_TAGS";
const TOGGLE_TAG = "hp/tags/TOGGLE_TAG";
const CHANGE_ALL_TAGS = "hp/tags/CHANGE_ALL_TAGS";
const FETCHED_TAGS = "hp/tags/FETCHED_TAGS";
const FETCH_TAGS_ERROR = "hp/tags/FETCH_TAGS_ERROR";
const SELECT_TAG = "hp/tags/SELECT_TAG";

const initialState = {
  loaded: false,
  loading: false,
  tags: [],
  selected: {},
  error: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_TAGS:
      return {
        ...state,
        loading: true
      };
    case FETCHED_TAGS:
      const tags = action.payload;
      return {
        loaded: true,
        loading: false,
        tags,
        selected: setAllTags(tags, true)
      };
    case TOGGLE_TAG:
      return {
        ...state,
        selected: {
          ...state.selected,
          [action.payload]: true
        }
      };
    case CHANGE_ALL_TAGS:
      return {
        ...state,
        selected: setAllTags(action.payload)
      };
    case FETCH_TAGS_ERROR:
      return {
        ...state,
        loaded: true,
        loading: false,
        error: aciton.payload
      };
    default:
      return state;
  };
};

const setAllTags = (tags, bool) => {
  const selected = {};
  tags.forEach((tag) => {
    selected[tag.id] = bool;
  });
  return selected;
};

export const toggleTag = (tagId) => {
  return {
    type: TOGGLE_TAG,
    payload: tagId
  };
};

export const changeAllTags = (bool) => {
  return {
    type: CHANGE_ALL_TAGS,
    payload: bool
  };
};

export const fetchTags = () => {
  return {
    type: [LOAD_TAGS, FETCHED_TAGS, FETCH_TAGS_ERROR],
    promise: axios.get("/api/tags")
  };
};

export const selectTag = (tag) => {
  return {
    type: SELECT_TAG,
    payload: tag
  };
};
import Immutable, { fromJS } from 'immutable';
import { FETCHED_GROUPS } from './groups';
import { FETCHED_TAGS } from './tags';

const TOGGLE_TAG = 'hp/query/TOGGLE_TAG';
const CHANGE_ALL_TAGS = 'hp/query/CHANGE_ALL_TAGS';
const CHANGE_RANGE = 'hp/query/CHANGE_RANGE';
const CHANGE_SEARCH_STRING = 'hp/query/CHANGE_SEARCH_STRING';
const CLEAR_SEARCH_STRING = 'hp/query/CLEAR_SEARCH_STRING';

const initialState = fromJS({
  searchString: '',
  range: 50,
  tags: {},
  location: false,
});

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCHED_GROUPS: {
      if (action.payload[0].distance !== undefined) {
        return state.set('location', true);
      }
    }
    case FETCHED_TAGS: {
      const tags = action.payload.reduce((map, tag) => map.set(tag.id, true), Immutable.Map());
      return state.set('tags', tags);
    }
    case TOGGLE_TAG:
      return state.setIn(['tags', action.payload], !state.getIn(['tags', action.payload]));
    case CHANGE_ALL_TAGS: {
      const tagState = state.get('tags').map(() => action.payload);
      return state.set('tags', tagState);
    }
    case CHANGE_RANGE:
      return state.set('range', action.payload);
    case CHANGE_SEARCH_STRING:
      return state.set('searchString', action.payload);
    case CLEAR_SEARCH_STRING:
      return state.set('searchString', '');
    default:
      return state;
  }
};

export const toggleTag = (tagId) => {
  return {
    type: TOGGLE_TAG,
    payload: tagId,
  };
};

export const changeRange = (miles) => {
  return {
    type: CHANGE_RANGE,
    payload: miles,
  };
};

export const changeSearchString = (str) => {
  return {
    type: CHANGE_SEARCH_STRING,
    payload: str,
  };
};

export const clearSearchString = () => {
  return {
    type: CLEAR_SEARCH_STRING,
  };
};

export const changeAllTags = (bool) => {
  return {
    type: CHANGE_ALL_TAGS,
    payload: bool,
  };
};
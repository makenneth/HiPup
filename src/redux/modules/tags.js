import { fromJS } from 'immutable';
import { Request } from 'helpers';

const LOAD_TAGS = 'hp/tags/LOAD_TAGS';
export const FETCHED_TAGS = 'hp/tags/FETCHED_TAGS';
const FETCH_TAGS_ERROR = 'hp/tags/FETCH_TAGS_ERROR';
const SELECT_TAG = 'hp/tags/SELECT_TAG';

const initialState = fromJS({
  loaded: false,
  loading: false,
  tags: [],
  error: null,
});

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_TAGS:
      return state.set('loading', true);
    case FETCHED_TAGS:
      const tags = action.payload;

      return state.merge({
        loaded: true,
        loading: false,
        tags,
      });
    case FETCH_TAGS_ERROR:
      return state.merge({
        loaded: true,
        loading: false,
        error: action.payload,
      });
    default:
      return state;
  };
};

export const fetchTags = () => {
  return {
    types: [LOAD_TAGS, FETCHED_TAGS, FETCH_TAGS_ERROR],
    promise: new Request('/api/tags').send(),
  };
};

export const selectTag = (tag) => {
  return {
    type: SELECT_TAG,
    payload: tag
  };
};

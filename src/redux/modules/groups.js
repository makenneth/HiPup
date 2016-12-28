import { fromJS } from 'immutable';
import { Request } from 'helpers';

const SET_RANGE = 'hp/groups/SET_RANGE';
export const FETCH_GROUPS = 'hp/groups/FETCH_GROUPS';
export const FETCH_GROUPS_SUCCESS = 'hp/groups/FETCH_GROUPS_SUCCESS';
export const FETCH_GROUPS_ERROR = 'hp/groups/FETCH_GROUPS_ERROR';

const initialState = fromJS({
  loading: false,
  loaded: false,
  groups: [],
  error: null,
});

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_GROUPS:
      return state.set('loading', true);
    case FETCH_GROUPS_SUCCESS: {
      return state.merge({
        groups: action.payload,
        loading: false,
        loaded: true
      });
    }
    case FETCH_GROUPS_ERROR:
      return state.merge({
        error: action.payload,
        loading: false,
        loaded: true
      });
    default:
      return state;
  }
};

export const fetchGroups = () => {
  return {
    types: [FETCH_GROUPS, FETCH_GROUPS_SUCCESS, FETCH_GROUPS_ERROR],
    promise: new Request('/api/groups').send(),
  };
};

export const isLoaded = (state) => {
  return state.groups.loaded;
};

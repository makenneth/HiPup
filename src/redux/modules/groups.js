import axios from 'axios';
import { fromJS } from 'immutable';
import { Request } from 'helpers';

const SET_RANGE = 'hp/groups/SET_RANGE';
const FETCH_GROUPS = 'hp/groups/FETCH_GROUPS';
export const FETCHED_GROUPS = 'hp/groups/FETCHED_GROUPS';
const FETCH_GROUP_ERROR = 'hp/groups/FETCH_GROUP_ERROR';

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
    case FETCHED_GROUPS: {
      return state.merge({
        groups: action.payload,
        loading: false,
        loaded: true
      });
    }
    case FETCH_GROUP_ERROR:
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
    types: [FETCH_GROUPS, FETCHED_GROUPS, FETCH_GROUP_ERROR],
    promise: new Request('/api/groups').send(),
  };
};

export const isLoaded = (state) => {
  return state.groups.loaded;
};

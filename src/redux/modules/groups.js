import { fromJS } from 'immutable';
import { Request } from 'helpers';

const SET_RANGE = 'hp/groups/SET_RANGE';
export const FETCH_GROUPS = 'hp/groups/FETCH_GROUPS';
export const FETCH_GROUPS_SUCCESS = 'hp/groups/FETCH_GROUPS_SUCCESS';
export const FETCH_GROUPS_FAIL = 'hp/groups/FETCH_GROUPS_FAIL';
export const CREATE_GROUP = 'hp/groups/CREATE_GROUP';
export const CREATE_GROUP_SUCCESS = 'hp/groups/CREATE_GROUP_SUCCESS';
export const CREATE_GROUP_FAIL = 'hp/groups/CREATE_GROUP_FAIL';
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
    case FETCH_GROUPS_FAIL:
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
    types: [FETCH_GROUPS, FETCH_GROUPS_SUCCESS, FETCH_GROUPS_FAIL],
    promise: new Request('/api/groups').send(),
  };
};

export const createGroup = (group) => {
  const data = { group };
  return {
    types: [CREATE_GROUP, CREATE_GROUP_SUCCESS, CREATE_GROUP_FAIL],
    promise: new Request('/api/groups', 'POST', data).send(),
  };
}

export const isLoaded = (state) => {
  return state.groups.loaded;
};

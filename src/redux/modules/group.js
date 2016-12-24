import { fromJS } from 'immutable';
import { Request } from 'helpers';

const SET_RANGE = 'hp/group/SET_RANGE';
const FETCH_GROUP = 'hp/group/FETCH_GROUPS';
const FETCHED_GROUP = 'hp/group/FETCHED_GROUPS';
const FETCH_GROUP_ERROR = 'hp/group/FETCH_GROUP_ERROR';
const JOINED_GROUP = 'hp/group/JOINED_GROUP';
const LEFT_GROUP = 'hp/group/LEFT_GROUP';
const initialState = fromJS({
  loading: false,
  loaded: false,
  group: null,
  cached: {},
});

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_GROUP:
      return state.set('loading', true);
    case FETCHED_GROUP: {
      return state.merge({
        group: action.payload,
        loading: false,
        loaded: true,
      });
    }
    case LEFT_GROUP:
    case JOINED_GROUP:
      return state.set('group', action.payload);
    case FETCH_GROUP_ERROR:
      return state.merge({
        error: action.payload,
        loading: false,
        loaded: true,
      });
    default:
      return state;
  }
};

export const fetchGroup = (id) => {
  return {
    types: [FETCH_GROUP, FETCHED_GROUP, FETCH_GROUP_ERROR],
    promise: new Request('/api/groups').send(),
  };
};

export const joinGroup = (groupId) => {
  const data = {
    group_participants: {
      group_id: groupId,
    }
  };

  return {
    types: ["TO BE ADDED", JOINED_GROUP, "TO BE ADDED"],
    promise: new Request('/api/group_participants', 'POST', data).send(),
  };
};

export const leaveGroup = (groupId) => {
  return {
    types: ["TO BE ADDED", JOINED_GROUP, "TO BE ADDED"],
    promise: new Request(`/api/group_participants/${groupId}`, 'DELETE').send(),
  };
};

export const isLoaded = (state, id) => {
  return state.group.get('id') === id || state.cached.get('id');
};
import { fromJS } from 'immutable';
import { Request } from 'helpers';

const SET_RANGE = 'hp/group/SET_RANGE';
const FETCH_GROUP = 'hp/group/FETCH_GROUPS';
const FETCHED_GROUP = 'hp/group/FETCHED_GROUPS';
const FETCH_GROUP_ERROR = 'hp/group/FETCH_GROUP_ERROR';
export const JOINED_GROUP = 'hp/group/JOINED_GROUP';
export const LEFT_GROUP = 'hp/group/LEFT_GROUP';
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
      return {
        group: action.payload,
        loading: false,
        loaded: true,
        cached: state.get('cached').set(action.payload.id, action.payload),
      };
    }
    case LEFT_GROUP:
      const partIndex = state.getIn(['group', 'participants'])
        .findIndex(participant => participant.get('id') === action.payload.id);
      return state.updateIn(['group', 'participants'], arr => arr.delete(partIndex));
    case JOINED_GROUP:
      return state.updateIn(['group', 'participants'], arr => arr.push(fromJS(action.payload)));
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
    promise: new Request(`/api/groups/${id}`).send(),
  };
};

export const joinGroup = (groupId) => {
  const data = {
    group_participants: {
      group_id: groupId,
    }
  };

  return {
    types: ['TO BE ADDED', JOINED_GROUP, 'TO BE ADDED'],
    promise: new Request('/api/group_participants', 'POST', data).send(),
  };
};

export const leaveGroup = (groupId) => {
  return {
    types: ['TO BE ADDED', JOINED_GROUP, 'TO BE ADDED'],
    promise: new Request(`/api/group_participants/${groupId}`, 'DELETE').send(),
  };
};

export const removeGroup = (groupId) => {
  return {
    types: ['TO BE ADDED', REMOVED_GROUP, 'TO BE ADDED'],
    promise: new Request(`/api/group/${groupId}`, 'DELETE').send(),
  };
};

export const isLoaded = (state, id) => {
  return state.group.get('id') === id || state.cached.get('id');
};

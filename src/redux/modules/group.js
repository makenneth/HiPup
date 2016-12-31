import { fromJS } from 'immutable';
import { Request } from 'helpers';
import { CREATE_GROUP_SUCCESS } from './groups';

const SET_RANGE = 'hp/group/SET_RANGE';
export const FETCH_GROUP = 'hp/group/FETCH_GROUP';
export const FETCH_GROUP_SUCCESS = 'hp/group/FETCH_GROUP_SUCCESS';
export const FETCH_GROUP_FAIL = 'hp/group/FETCH_GROUP_FAIL';
export const JOINED_GROUP = 'hp/group/JOINED_GROUP';
export const LEFT_GROUP = 'hp/group/LEFT_GROUP';
const initialState = fromJS({
  loading: false,
  loaded: false,
  group: null,
  cached: {},
});

export default (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case FETCH_GROUP:
      return state.set('loading', true);
    case CREATE_GROUP_SUCCESS:
    case FETCH_GROUP_SUCCESS: {
      return state.merge({
        group: action.payload,
        loading: false,
        loaded: true,
        cached: state.get('cached').set(action.payload.id, action.payload),
      });
    }
    case LEFT_GROUP: {
      const partIndex = state.getIn(['group', 'participants'])
        .findIndex(participant => participant.get('id') === action.payload.userId);
      return state.updateIn(['group', 'participants'], arr => arr.delete(partIndex));
    }
    case JOINED_GROUP:
      return state.updateIn(['group', 'participants'], arr => arr.push(fromJS(action.payload.user)));
    case FETCH_GROUP_FAIL:
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
    types: [FETCH_GROUP, FETCH_GROUP_SUCCESS, FETCH_GROUP_FAIL],
    promise: new Request(`/api/groups/${id}`).send(),
  };
};

export const joinGroup = (groupId) => {
  const data = {
    group_participant: {
      group_id: groupId
    }
  };
  return {
    types: ['TO BE ADDED', JOINED_GROUP, 'TO BE ADDED'],
    promise: new Request('/api/group_participants', 'POST', data).send(),
  };
};

export const leaveGroup = (groupId) => {
  return {
    types: ['TO BE ADDED', LEFT_GROUP, 'TO BE ADDED'],
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
  return state.get('group') &&
    (state.getIn(['group', 'id']) === id || state.getIn(['cached', 'id']));
};

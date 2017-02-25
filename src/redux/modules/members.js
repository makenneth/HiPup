import { fromJS } from 'immutable';
import { Request } from 'helpers';

const FETCH_GROUP_MEMBERS_REQUEST = 'hp/members/FETCH_REQUEST';
const FETCH_GROUP_MEMBERS_SUCCESS = 'hp/members/FETCH_SUCCESS';
const FETCH_GROUP_MEMBERS_FAILURE = 'hp/members/FETCH_FAILURE';

const initialState = fromJS({
  loading: false,
  cached: {},
});

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_GROUP_MEMBERS_REQUEST:
      return state.set('loading', true);
    case FETCH_GROUP_MEMBERS_SUCCESS: {
      const members = action.payload.reduce((acc, member) => {
        acc[member.id] = member;
        return acc;
      }, acc);
      return state.merge({
        loading: false,
        cached: state.get('cached').merge(members),
      });
    }
    default:
      return state;
  }
};

export function fetchGroupMembers(groupId) {
  return {
    types: [FETCH_GROUP_MEMBERS_REQUEST, FETCH_GROUP_MEMBERS_SUCCESS, FETCH_GROUP_MEMBERS_FAILURE],
    promise: new Request(`/api/group_participants/${groupId}`).send(),
  };
}

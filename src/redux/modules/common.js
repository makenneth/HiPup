import { fromJS } from 'immutable';

import { FETCH_EVENTS, FETCH_EVENTS_SUCCESS, FETCH_EVENTS_FAIL } from './groupEvents';
import { FETCH_GROUPS, FETCH_GROUPS_SUCCESS, FETCH_GROUPS_FAIL } from './groups';
import { FETCH_GROUP, FETCH_GROUP_SUCCESS, FETCH_GROUP_FAIL } from './group';

export const LOAD_START = 'hp/COMMON/LOAD_START';
export const LOAD_END = 'hp/COMMON/LOAD_END';

export default (state = fromJS({ loadCount: 0 }), action) => {
  switch (action.type) {
    case FETCH_EVENTS:
    case FETCH_GROUPS:
    case FETCH_GROUP:
    case LOAD_START:
      return state.set('loadCount', state.get('loadCount') + 1);
    case FETCH_EVENTS_SUCCESS:
    case FETCH_EVENTS_FAIL:
    case FETCH_GROUPS_SUCCESS:
    case FETCH_GROUPS_FAIL:
    case FETCH_GROUP_SUCCESS:
    case FETCH_GROUP_FAIL:
    case LOAD_END:
      return state.set('loadCount', state.get('loadCount') - 1);
    default:
      return state;
  }
}

export const startLoad = () => {
  return {
    type: LOAD_START
  };
};

export const endLoad = () => {
  return {
    type: LOAD_END
  };
};

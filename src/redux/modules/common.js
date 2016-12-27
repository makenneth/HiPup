import { fromJS } from 'immutable';

export const LOAD_START = 'hp/COMMON/LOAD_START';
export const LOAD_END = 'hp/COMMON/LOAD_END';

export default (state = fromJS({ loadCount: 0 }), action) => {
  switch (action.type) {
    case LOAD_START:
      return state.set('loadCount', state.get('loadCount') + 1);
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

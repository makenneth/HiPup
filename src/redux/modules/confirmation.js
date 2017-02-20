import { fromJS } from 'immutable';

const OPEN_CONFIRMATION = 'hp/confirmation/OPEN_CONFIRMATION';
const CLOSE_CONFIRMATION = 'hp/confirmation/CLOSE_CONFIRMATION';

const initialState = fromJS({
  isOpen: false,
  callback: null,
});

export default (state = initialState, action) => {
  switch (action.type) {
    case OPEN_CONFIRMATION:
      return state.merge({
        isOpen: true,
        callback: action.payload,
      });
    case CLOSE_CONFIRMATION:
      return initialState;
    default:
      return state;
  }
}


export const openConfirm = (callback) => {
  return {
    type: OPEN_CONFIRMATION,
    payload: callback,
  };
};


export const closeConfirm = () => {
  return {
    type: CLOSE_CONFIRMATION
  };
};

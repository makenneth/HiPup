import { fromJS } from 'immutable';

const OPEN_MODAL = 'hp/success/OPEN_MODAL';
const CLOSE_MODAL = 'hp/success/CLOSE_MODAL';
const initialState = fromJS({
  open: false,
  message: null
});

export default (state = initialState, action) => {
  switch (action.type) {
    case OPEN_MODAL:
      return state.merge({
        open: true,
        message: action.payload
      });
    case CLOSE_MODAL:
      return fromJS({ open: false });
    default:
      return state;
  }
};

export const openModal = (message) => {
  return {
    type: OPEN_MODAL,
    payload: message,
  };
};

export const closeModal = () => {
  return {
    type: CLOSE_MODAL
  };
};

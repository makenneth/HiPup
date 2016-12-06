const OPEN_LOGIN = "hp/form/OPEN_LOGIN";
const OPEN_SIGNUP = "hp/form/OPEN_SIGNUP";
const CLOSE_LOGIN = "hp/form/CLOSE_LOGIN";
const CLOSE_SIGNUP = "hp/form/CLOSE_SIGNUP";

export default (state = {
  login: false,
  signup: false
}, action) => {
  switch (action.type) {
    case OPEN_LOGIN:
      return {
        login: true
      };
    case OPEN_SIGNUP:
      return {
        signup: true
      };
    case CLOSE_LOGIN:
      return {
        login: false
      };
    case CLOSE_SIGNUP:
      return {
        signup: false
      };
    default:
      return state;
  }
}

export const openLogIn = () => {
  return {
    type: OPEN_LOGIN
  };
};

export const openSignUp = () => {
  return {
    type: OPEN_SIGNUP
  };
};

export const closeLogIn = () => {
  return {
    type: CLOSE_LOGIN
  };
};

export const closeSignUp = () => {
  return {
    type: CLOSE_SIGNUP
  };
};
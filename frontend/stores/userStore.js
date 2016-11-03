import { ERROR, LOGIN, LOGOUT, LOAD,
  TOGGLED_GROUP, TOGGLED_EVENT} from '../constants/constants';

const Store = require("flux/utils").Store;
const AppDispatcher = require("../dispatcher/dispatcher");
const UserStore = new Store(AppDispatcher);

let _currentUser = null;
let loading = false;
let loaded = false;
let _errors = [];

UserStore.hasLoaded = function() {
  return loaded;
};
UserStore.isLoading = function() {
  return loading;
};

UserStore.currentUser = function() {
  return _currentUser;
};

UserStore.errors = function() {
  return _errors;
};


const _setCurrentUser = (user) => {
  loading = false;
  loaded = true;
  _currentUser = user;
  _errors = [];
};

const _unsetCurrentUser = () => {
  _currentUser = null;
  _errors = [];
};
const _setErrors = (errors) => {
  _errors = errors ? errors : [];
};

UserStore.__onDispatch = function(payload) {
  switch (payload.actionType){
    case ERROR:
      _setErrors(payload.errors);
      UserStore.__emitChange();
      break;
    case LOAD:
      loading = true;
      UserStore.__emitChange();
      break;
    case LOGIN:
      _setCurrentUser(payload.user);
      UserStore.__emitChange();
      break;
    case LOGOUT:
      _unsetCurrentUser();
      UserStore.__emitChange();
      break;
    case TOGGLED_GROUP:
    case TOGGLED_EVENT:
      _setCurrentUser(payload.currentUser);
      UserStore.__emitChange();
      break;
  }
};

module.exports = UserStore;

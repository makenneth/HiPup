import { ERROR, LOGIN, LOGOUT,
  TOGGLED_GROUP, TOGGLED_EVENT, FOUND_LOCATION } from '../constants/constants';

const Store = require("flux/utils").Store;
const AppDispatcher = require("../dispatcher/dispatcher");
const UserStore = new Store(AppDispatcher);

let _currentUser = null;
let _errors = [];

const _currentLocation = {
  place: "",
  coords: {},
  timeZone: "America/Los_Angeles"
};

UserStore.currentUser = function() {
  return _currentUser;
};

UserStore.errors = function() {
  return _errors;
};

const _setCurrentLocation = (location) => {
  _currentLocation.coords.latitude = location.lat;
  _currentLocation.coords.longitude = location.lon;
  _currentLocation.place = [location.city, location.region].join(", ");
  _currentLocation.timeZone = location.timeZone;
  UserStore.__emitChange();
};

UserStore.currentLocation = function(){
  return _currentLocation;
};
const _setCurrentUser = (user) => {
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
    case FOUND_LOCATION:
      _setCurrentLocation(payload.data);
      UserStore.__emitChange();
      break;

  }
};

module.exports = UserStore;

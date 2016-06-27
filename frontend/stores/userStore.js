var Store = require("flux/utils").Store,
    AppDispatcher = require("../dispatcher/dispatcher"),
    UserStore = new Store(AppDispatcher),
    UserConstants = require('../constants/userConstants');

var _currentUser = null,
    _errors = [],
    _currentLocation = {place: "", coords: {}, timeZone: "America/Los_Angeles"};

UserStore.currentUser = function(){
  return _currentUser;
};

UserStore.errors = function(){
  return _errors;
};

_setCurrentLocation = function(location){
  _currentLocation.coords.latitude = location.lat;
  _currentLocation.coords.longitude = location.lon;
  _currentLocation.place = [location.city, location.region].join(", ");
  _currentLocation.timeZone = location.timeZone;
  UserStore.__emitChange();
};

UserStore.currentLocation = function(){
  return _currentLocation;
};
var _setCurrentUser = function(user){
  _currentUser = user;
  _errors = [];
};
var _unsetCurrentUser = function(){
  _currentUser = null;
  _errors = [];
};
var _setErrors = function(errors){
  _errors = errors ? errors : [];
};
UserStore.__onDispatch = function(payload) {
  switch (payload.actionType){
    case UserConstants.ERROR:
      _setErrors(payload.errors);
      UserStore.__emitChange();
      break;
    case UserConstants.LOGIN:
      _setCurrentUser(payload.user);
      UserStore.__emitChange();
      break;
    case UserConstants.LOGOUT:
      _unsetCurrentUser();
      UserStore.__emitChange();
      break;
    case UserConstants.TOGGLED_GROUP:
    case UserConstants.TOGGLED_EVENT:
      _setCurrentUser(payload.currentUser);
      UserStore.__emitChange(); 
      break;
    case UserConstants.FOUND_LOCATION:
      _setCurrentLocation(payload.data);
      UserStore.__emitChange();
      break;

  }
};

module.exports = UserStore;

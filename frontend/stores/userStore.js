var Store = require("flux/utils").Store,
		AppDispatcher = require("../dispatcher/dispatcher"),
		UserStore = new Store(AppDispatcher),
		UserConstants = require('../constants/userConstants');

var _currentUser = null,
		_errors = [];

UserStore.currentUser = function(){
	return _currentUser;
};

UserStore.errors = function(){
	return _errors;
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
	_errors = errors;
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
			_setCurrentUser(payload.currentUser);
			UserStore.__emitChange(); //this should refetch the currentUser
			break;
	}
};

module.exports = UserStore;
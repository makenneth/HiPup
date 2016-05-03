var AppDispatcher = require('../dispatcher/dispatcher'),
		Store = require('flux/utils').Store,
		ErrorConstant = require('../constants/errorConstant');

var ErrorStore = new Store(AppDispatcher);

var _errors = [];

var _setError = function(error) {
	_errors = error;
};
ErrorStore.getError = function(){
	var errors = _errors;
	_errors = [];
	return errors;
};

ErrorStore.__onDispatch = function(payload){
	switch (payload.actionType){
		case ErrorConstant.ERROR_RECEIVED:
			_setError(payload.error);
			ErrorStore.__emitChange();
			break;
	}
};

module.exports = ErrorStore;
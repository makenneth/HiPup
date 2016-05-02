var AppDispatcher = require('../dispatcher/dispatcher').Dispatcher,
		Store = require('flux/utils').Store,
		ErrorConstant = require('../constants/errorConstant');

var ErrorStore = new Store(AppDispatcher);

var _errors = null;

var _setError = function(error) {
	_errors = errors
};
ErrorStore.getError = function(){
	var errors = _errors;
	_errors = null;
	return errors;
};

ErrorStore.__onDispatcher = function(payload){
	switch (payload.actionType){
		case ErrorStore.ERROR_RECEIVED:
			_setError(payload.error);
			break;
	}
};

module.exports = ErrorStore;
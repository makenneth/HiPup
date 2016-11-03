import { ERROR_RECEIVED } from '../constants/constants';
const AppDispatcher = require('../dispatcher/dispatcher');
const Store = require('flux/utils').Store;

const ErrorStore = new Store(AppDispatcher);

let _errors = [];

const _setError = function(error) {
	_errors = error;
};
ErrorStore.getError = function() {
	const errors = _errors;
	_errors = [];
	return errors;
};

ErrorStore.__onDispatch = function(payload) {
	switch (payload.actionType) {
		case ERROR_RECEIVED:
			_setError(payload.error);
			ErrorStore.__emitChange();
			break;
	}
};

module.exports = ErrorStore;

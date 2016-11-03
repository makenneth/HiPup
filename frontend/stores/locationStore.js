const AppDispatcher = require('../dispatcher/dispatcher');
const Store = require('flux/utils').Store;
const LocationStore = new Store(AppDispatcher);

LocationStore.__onDispatch = function(payload) {
	switch (payload.actionType) {
		case "LOCATION_CALLBACK_CALLED":
			LocationStore.__emitChange();
			break;
	}
};

module.exports = LocationStore;
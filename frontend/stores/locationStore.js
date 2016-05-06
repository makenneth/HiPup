var AppDispatcher = require('../dispatcher/dispatcher'),
		Store = require('flux/utils').Store,
		LocationStore = new Store(AppDispatcher);

LocationStore.__onDispatch = function(payload){
	switch (payload.actionType){
		case "LOCATION_CALLBACK_CALLED": 
			LocationStore.__emitChange();
			break;
	}
};

module.exports = LocationStore;
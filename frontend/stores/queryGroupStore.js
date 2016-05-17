var AppDispatcher = require('../dispatcher/dispatcher'),
		Store = require('flux/utils').Store,
		GroupConstants = require('../constants/groupConstants');

var QueryGroupStore = new Store(AppDispatcher);
var _queriedGroups = {};

var _setGroups = function(groups, miles){
	_queriedGroups[miles] = groups;
};

QueryGroupStore.findGroups = function(miles){
	return _queriedGroups[miles];
};

QueryGroupStore.__onDispatch = function(payload){
	switch(payload.actionType){
		case GroupConstants.GROUPS_DISTANCE_FETCHED:
			_setGroups(payload.groups, payload.miles);
			QueryGroupStore.__emitChange();
			break;
	}
};

module.exports = QueryGroupStore;
var Store = require('flux/utils').Store,
		AppDispatcher = require('../dispatcher/dispatcher'),
		GroupQueryStore = new Store(AppDispatcher);

var _groupsQueried = [];

var _setGroups = function(groups){
	_groupsQueried = groups;
};

GroupQueryStore.all = function() {
	return _groupsQueried;
};

GroupQueryStore.__onDispatch = function(payload){
	switch (payload.actionType){
		case "GROUPS_FETCHED_WITH_CRITERIA":
			_setGroups(payload.groups);
			GroupQueryStore.__emitChange();
			break;
	}
};

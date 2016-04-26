var AppDispatcher = require('../dispatcher/dispatcher'),
		Store = require('flux/utils').Store,
		GroupStore = new Store(AppDispatcher),
		GroupConstants =  require('../constants/groupConstants');

var _groups = {};

var _resetGroups = function(groups){
	Object.assign({}, groups)
};

var _resetGroup = function(group){
	_groups[group.id] = group;
};

var _removeGroup = function(group){
	for (var key in _groups){
		
	}
};

GroupStore.all = function(){

};

GroupStore.__onDispatch = function(payload){
	switch (payload.actionType){
		case GroupConstants.RECEIVED_GROUPS:
			_resetGroups(payload.groups);
			break;
		case GroupConstants.RECEIVED_GROUP:
			_resetGroup(payload.group);
			break;
		case GroupConstants.REMOVED_GROUP:
			_removeGroup(payload.group);
			break;

	}
};
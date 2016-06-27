var AppDispatcher = require('../dispatcher/dispatcher'),
		Store = require('flux/utils').Store,
		GroupStore = new Store(AppDispatcher),
		GroupConstants =  require('../constants/groupConstants');

var _groups = {},
		_lastEditedGroup = null
		cached = {};

var _resetGroups = function(groups){
	groups.forEach(function(group){
		_groups[group.id] = group;
	});
};

var _resetGroup = function(group){
	_groups[group.id] = group;
	_lastEditedGroup = group;
};

var _removeGroup = function(group){
		if (_groups[group.id]){
			delete _groups[group.id];
			return true;
		}
};

GroupStore.all = function(){
	var groups = [];
	for (var id in _groups){
		groups.push(_groups[id]);
	}
	return groups;
};
GroupStore.findAllWithDistance = function(distance) {
	var groups = [];
	if (!cached[distance]){
		for (var id in _groups){
			if (_groups[id].distance <= distance){
				groups.push(_groups[id]);
			}
		}
		cached[distance] = groups;
	}
	return cached[distance];
};

GroupStore.find = function(id){
	return _groups[id];
};

GroupStore.last = function(){
	return _lastEditedGroup.id;
};
GroupStore.__onDispatch = function(payload){
	switch (payload.actionType){
		case GroupConstants.RECEIVED_GROUPS:
			_resetGroups(payload.groups);
			GroupStore.__emitChange();
			break;
		case GroupConstants.RECEIVED_GROUP:
			_resetGroup(payload.group);
			GroupStore.__emitChange();
			break;
		case GroupConstants.REMOVED_GROUP:
			_removeGroup(payload.group);
			GroupStore.__emitChange();
			break;
	}
};

module.exports = GroupStore;

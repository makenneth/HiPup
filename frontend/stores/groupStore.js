const AppDispatcher = require('../dispatcher/dispatcher');
const Store = require('flux/utils').Store;
const GroupStore = new Store(AppDispatcher);

import { RECEIVED_GROUPS, RECEIVED_GROUP, REMOVED_GROUP } from "../constants/constants";

const _groups = {};
let _lastEditedGroup = null;
const cached = {};

const _resetGroups = (groups) => {
	groups.forEach((group) => {
		_groups[group.id] = group;
	});
};

const _resetGroup = (group) => {
	_groups[group.id] = group;
	_lastEditedGroup = group;
};

const _removeGroup = (group) => {
		if (_groups[group.id]) {
			delete _groups[group.id];
			return true;
		}
};

GroupStore.all = function() {
	const groups = [];
	for (let id in _groups) {
		groups.push(_groups[id]);
	}
	return groups;
};
GroupStore.findAllWithDistance = function(distance) {
	const groups = [];
	if (!cached[distance]) {
		for (let id in _groups) {
			if (_groups[id].distance <= distance) {
				groups.push(_groups[id]);
			}
		}
		cached[distance] = groups;
	}
	return cached[distance];
};

GroupStore.find = function(id) {
	return _groups[id];
};

GroupStore.last = function() {
	return _lastEditedGroup.id;
};
GroupStore.__onDispatch = function(payload) {
	switch (payload.actionType) {
		case RECEIVED_GROUPS:
			_resetGroups(payload.groups);
			GroupStore.__emitChange();
			break;
		case RECEIVED_GROUP:
			_resetGroup(payload.group);
			GroupStore.__emitChange();
			break;
		case REMOVED_GROUP:
			_removeGroup(payload.group);
			GroupStore.__emitChange();
			break;
	}
};

module.exports = GroupStore;

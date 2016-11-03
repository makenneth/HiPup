import { RECEIVED_GROUPS, RECEIVED_GROUP, REMOVED_GROUP, FETCHING_GROUP } from "../constants/constants";
import { hasError } from "./locationStore";

const AppDispatcher = require('../dispatcher/dispatcher');
const Store = require('flux/utils').Store;
const GroupStore = new Store(AppDispatcher);

const _groups = {};
let loading = false;
let loaded = false;
const cached = {};
let _lastEditedGroup = null;

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
	Object.keys(_groups).forEach((id) => {
		groups.push(_groups[id]);
	})
	return groups;
};
GroupStore.loading = function() {
	return loading;
};
GroupStore.loaded = function() {
	return loaded;
};
GroupStore.findAllWithDistance = function(distance) {
	const groups = [];
	if (hasError()) {
		const groups = [];
		Object.keys(_groups).forEach((id) => {
			groups.push(_groups[id]);
		})
		return groups;
	}
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
		case FETCHING_GROUP:
			loading = true;
			break;
		case RECEIVED_GROUPS:
			loaded = true;
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

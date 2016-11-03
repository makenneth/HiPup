import { GROUPS_DISTANCE_FETCHED } from "../constants/constants";

const AppDispatcher = require('../dispatcher/dispatcher');
const Store = require('flux/utils').Store;
const QueryGroupStore = new Store(AppDispatcher);

const _queriedGroups = {};

const _setGroups = (groups, miles) => {
	_queriedGroups[miles] = groups;
};

QueryGroupStore.findGroups = function(miles){
	return _queriedGroups[miles];
};

QueryGroupStore.__onDispatch = function(payload){
	switch(payload.actionType){
		case GROUPS_DISTANCE_FETCHED:
			_setGroups(payload.groups, payload.miles);
			QueryGroupStore.__emitChange();
			break;
	}
};

module.exports = QueryGroupStore;
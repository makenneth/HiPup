const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatcher/dispatcher');
const GroupEventStore = new Store(AppDispatcher);

const _groupEvents = {};
let _lastGroupEvents = null;

const _resetGroupEvents = (groupEvents) => {
	groupEvents.forEach((groupEvent) => {
		_groupEvents[groupEvent.id] = groupEvent;
	});
};

const _setSingleEvent = (singleEvent) => {
	_groupEvents[singleEvent.id] = singleEvent;
	_lastGroupEvents = singleEvent;
};

GroupEventStore.all = function(){
	return _groupEvents;
};

GroupEventStore.last = function() {
	return _lastGroupEvents.id;
};
GroupEventStore.find = function(id) {
	return _groupEvents[id] || {
		event_users: []
	};
};

GroupEventStore.__onDispatch = function(payload){
	switch (payload.actionType){
		case "FETCHED_GROUP_EVENTS":
			_resetGroupEvents(payload.groupEvents);
			GroupEventStore.__emitChange();
			break;
		case "FETCHED_SINGLE_EVENT":
			_setSingleEvent(payload.groupEvent);
			GroupEventStore.__emitChange();
			break;
	}
};

module.exports = GroupEventStore;

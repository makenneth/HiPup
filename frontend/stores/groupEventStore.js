var Store = require('flux/utils').Store,
		AppDispatcher = require('../dispatcher/dispatcher'),
		GroupEventStore = new Store(AppDispatcher),
		GroupEventConstants = require('../constants/groupEventConstants');

var _groupEvents = {},
		_lastGroupEvents = null;

var _resetGroupEvents = function(groupEvents){
	groupEvents.forEach(function(groupEvent){
		_groupEvents[groupEvent.id] = groupEvent;
	});
};

var _setSingleEvent = function(singleEvent){
	_groupEvents[singleEvent.id] = singleEvent;
	_lastGroupEvents = singleEvent;
};

GroupEventStore.all = function(){
	return _groupEvents;
};

GroupEventStore.last = function() {
	return _lastGroupEvents.id;
};
GroupEventStore.find = function(id){
	return _groupEvents[id] || {
		event_time: null,
		lat: null,
		lng: null,
		city: null,
		state: null,
		title: null,
		description: null,
		group_id: null,
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

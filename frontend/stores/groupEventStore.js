var Store = require('flux/utils').Store,
		AppDispatcher = require('../dispatcher/dispatcher'),
		GroupEventStore = new Store(AppDispatcher),
		GroupEventConstants = require('../constants/groupEventConstants');

var _groupEvents = {};

var _resetGroupEvents = function(groupEvents){
	groupEvents.forEach(function(groupEvent){
		_groupEvents[groupEvent.id] = groupEvent;
	});
};

var _resetSingleEvent = function(singleEvent){
	_groupEvents[singleEvent.id] = singleEvent;
};

GroupEventStore.all = function(){
	return _groupEvents;
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
		group_id: null
	};
};

GroupEventStore.__onDispatch = function(payload){
	switch (payload.actionType){
		case "FETCHED_GROUP_EVENTS":
			_resetGroupEvents(payload.groupEvents);
			GroupEventStore.__emitChange();
			break;
		case "FETCHED_SINGLE_EVENT":
			_resetSingleEvent(payload.groupEvent);
			GroupEventStore.__emitChange();
			break;
	}
};

module.exports = GroupEventStore;
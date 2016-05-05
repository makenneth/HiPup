var Store = require('flux/utils').Store,
		AppDispatcher = require('../dispatcher/dispatcher'),
		EventQueryStore = new Store(AppDispatcher),
		EventQueryConstants = require('../constants/eventQueryConstants')

var _eventsByDate = [],
		_eventsByLocation = [];


var _setEventsByDate = function(groupEvents){
	_eventsByDate = groupEvents.group_events;
};

var _setEventsByLocation = function(groupEvent){
	_eventsByLocation = groupEvent;
};

EventQueryStore.allByDate = function(){
	return _eventsByDate;
};

EventQueryStore.allByLocation = function(){
	return _eventsByLocation;
};

EventQueryStore.__onDispatch = function(payload){
	switch (payload.actionType){
		case EventQueryConstants.TIME_QUERY_FETCHED:
			_setEventsByDate(payload.groupEvents);
			EventQueryStore.__emitChange();
			break;
		case EventQueryConstants.LOCATION_QUERY_FETCHED:
			_setEventsByLocation(payload.groupEvents);
			EventQueryStore.__emitChange();
			break;
	}
};
module.exports = EventQueryStore;

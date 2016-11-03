import { TIME_QUERY_FETCHED, LOCATION_QUERY_FETCHED } from "../constants/constants";

const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatcher/dispatcher');
const EventQueryStore = new Store(AppDispatcher);
let _eventsByDate = [];
let _eventsByLocation = [];


const _setEventsByDate = (groupEvents) => {
	_eventsByDate = groupEvents.group_events;
};

const _setEventsByLocation = (groupEvent) => {
	_eventsByLocation = groupEvent;
};

EventQueryStore.allByDate = function() {
	return _eventsByDate;
};

EventQueryStore.allByLocation = function() {
	return _eventsByLocation;
};

EventQueryStore.__onDispatch = function(payload) {
	switch (payload.actionType) {
		case TIME_QUERY_FETCHED:
			_setEventsByDate(payload.groupEvents);
			EventQueryStore.__emitChange();
			break;
		case LOCATION_QUERY_FETCHED:
			_setEventsByLocation(payload.groupEvents);
			EventQueryStore.__emitChange();
			break;
	}
};

module.exports = EventQueryStore;

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

var _resetSinglesEvent = function(singleEvent){
	
};

GroupEventStore.all = function(){
	return _groupEvents;
};

GroupEventStore.__onDispatch = function(payload){

};
import { ERROR_RECEIVED, RECEIVED_GROUPS, GROUPS_DISTANCE_FETCHED,
RECEIVED_GROUP, REMOVED_GROUP, MEMBER_FETCHED,
RECEIVED_TAGS, RECEIVED_TAG,
FETCHED_GROUP_EVENTS, TOGGLED_GROUP, TOGGLED_EVENT,
FETCHED_SINGLE_EVENT, LOCATION_QUERY_FETCHED,
TIME_QUERY_FETCHED, LOAD, FETCHING_GROUP } from "../constants/constants";

const Dispatcher = require('../dispatcher/dispatcher');

module.exports = {
	fetchingGroup: function() {
		Dispatcher.dispatch({
			actionType: FETCHING_GROUP
		});
	},
	loadUser: function() {
		Dispatcher.dispatch({
			actionType: LOAD
		});
	},
	errorReceived: function(error) {
		const errors = JSON.parse(error.responseText);
		Dispatcher.dispatch({
			actionType: ERROR_RECEIVED,
			error
		});
	},
	receivedGroups: function(groups) {
		Dispatcher.dispatch({
			actionType: RECEIVED_GROUPS,
			groups
		});
	},
	groupsDistanceFetched: function(groups, miles) {
		Dispatcher.dispatch({
			actionType: GROUPS_DISTANCE_FETCHED,
			groups,
			miles
		});
	},
	receivedGroup: function(group) {
		Dispatcher.dispatch({
			actionType: RECEIVED_GROUP,
			group
		});
	},
	removedGroup: function(group) {
		Dispatcher.dispatch({
			actionType: REMOVED_GROUP,
			group
		});
	},
	memberFetched: function(member) {
		Dispatcher.dispatch({
			actionType: MEMBER_FETCHED,
			member
		});
	},
	fetchedTags: function(tags) {
		Dispatcher.dispatch({
			actionType: RECEIVED_TAGS,
			tags
		});
	},
	fetchedTag: function(tag) {
		Dispatcher.dispatch({
			actionType: RECEIVED_TAG,
			tag
		});
	},
	createdTag: function(tag) {
		Dispatcher.dispatch({
			actionType: RECEIVED_TAG,
			tag
		});
	},
	fetchedAllEvents: function(groupEvents) {
		Dispatcher.dispatch({
			actionType: FETCHED_GROUP_EVENTS,
			groupEvents
		});
	},

	fetchedSingleEvent: function(groupEvent) {
		Dispatcher.dispatch({
			actionType: FETCHED_SINGLE_EVENT,
			groupEvent
		});
	},
	toggledGroup: function(currentUser) {
		Dispatcher.dispatch({
			actionType: TOGGLED_GROUP,
			currentUser
		});
	},

	toggledEvent: function(currentUser) {
		Dispatcher.dispatch({
			actionType: TOGGLED_EVENT,
			currentUser
		});
	},
	createdEvent: function(groupEvent) {
		Dispatcher.dispatch({
			actionType: FETCHED_SINGLE_EVENT,
			groupEvent
		});
	},
	cancelledEvent: function(groupEvent) {
		Dispatcher.dispatch({
			actionType: FETCHED_SINGLE_EVENT,
			groupEvent
		});
	},
	fetchedEventsByLocation: function(groupEvents) {
		Dispatcher.dispatch({
			actionType: LOCATION_QUERY_FETCHED,
			groupEvents
		});
	},
	fetchedEventsByDate: function(groupEvents) {
		Dispatcher.dispatch({
			actionType: TIME_QUERY_FETCHED,
			groupEvents
		});
	}
};

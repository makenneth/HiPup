import { ERROR_RECEIVED, RECEIVED_GROUPS, GROUPS_DISTANCE_FETCHED,
RECEIVED_GROUP, REMOVED_GROUP, MEMBER_FETCHED,
RECEIVED_TAGS, RECEIVED_TAG,
FETCHED_GROUP_EVENTS, TOGGLED_GROUP, TOGGLED_EVENT,
FETCHED_SINGLE_EVENT, LOCATION_QUERY_FETCHED,
TIME_QUERY_FETCHED } from "../constants/constants";

const Dispatcher = require('../dispatcher/dispatcher');
const dispatch = Dispatcher.dispatch;

module.exports = {
	errorReceived: function(error) {
		const errors = JSON.parse(error.responseText);
		dispatch({
			actionType: ERROR_RECEIVED,
			error
		});
	},
	receivedGroups: function(groups) {
		dispatch({
			actionType: RECEIVED_GROUPS,
			groups
		});
	},
	groupsDistanceFetched: function(groups, miles) {
		dispatch({
			actionType: GROUPS_DISTANCE_FETCHED,
			groups,
			miles
		});
	},
	receivedGroup: function(group) {
		dispatch({
			actionType: RECEIVED_GROUP,
			group
		});
	},
	removedGroup: function(group) {
		dispatch({
			actionType: REMOVED_GROUP,
			group
		});
	},
	memberFetched: function(member) {
		dispatch({
			actionType: MEMBER_FETCHED,
			member
		});
	},
	fetchedTags: function(tags) {
		dispatch({
			actionType: RECEIVED_TAGS,
			tags
		});
	},
	fetchedTag: function(tag) {
		dispatch({
			actionType: RECEIVED_TAG,
			tag
		});
	},
	createdTag: function(tag) {
		dispatch({
			actionType: RECEIVED_TAG,
			tag
		});
	},
	fetchedAllEvents: function(groupEvents) {
		dispatch({
			actionType: FETCHED_GROUP_EVENTS,
			groupEvents
		});
	},

	fetchedSingleEvent: function(groupEvent) {
		dispatch({
			actionType: FETCHED_SINGLE_EVENT,
			groupEvent
		});
	},
	toggledGroup: function(currentUser) {
		dispatch({
			actionType: TOGGLED_GROUP,
			currentUser
		});
	},

	toggledEvent: function(currentUser) {
		dispatch({
			actionType: TOGGLED_EVENT,
			currentUser
		});
	},
	createdEvent: function(groupEvent) {
		dispatch({
			actionType: FETCHED_SINGLE_EVENT,
			groupEvent
		});
	},
	cancelledEvent: function(groupEvent) {
		dispatch({
			actionType: FETCHED_SINGLE_EVENT,
			groupEvent
		});
	},
	fetchedEventsByLocation: function(groupEvents) {
		dispatch({
			actionType: LOCATION_QUERY_FETCHED,
			groupEvents
		});
	},
	fetchedEventsByDate: function(groupEvents) {
		dispatch({
			actionType: TIME_QUERY_FETCHED,
			groupEvents
		});
	}
};

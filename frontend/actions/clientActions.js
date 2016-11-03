import { fetchAllGroups, fetchSingleGroup, fetchCustomGroups,
	createGroup, updateGroup, removeGroup,
	fetchMember, fetchTags, fetchTag,
	createTag, fetchAllEvents, fetchSingleEvent,
	editEvent, cancelEvent, joinGroup,
	leaveGroup, joinEvent, leaveEvent,
	createEvent, fetchAllEventsByDate, fetchAllEventsByLocation } from '../util/apiUtil';

const groupParticipantData = (userId, groupId) => {
	return {
		group_participant: {
			participant_id: userId,
			group_id: groupId
		}
	};
};
const eventParticipantData = (userId, eventId) => {
	return {
		event_user: {
			user_id: userId,
			event_id: eventId
		}
	};
};

module.exports = {
	fetchAllGroups: function(coords) {
		if (!coords.latitude) return;
		fetchAllGroups(coords);
	},
	fetchSingleGroup: function(id, timezone) {
		fetchSingleGroup(id, timezone);
	},
	fetchGroupsByLocation: function(miles, coords){
		fetchCustomGroups(miles, coords, "custom");
	},
	createGroup: function(group){
		createGroup(group);
	},
	updateGroup: function(group, id){
		updateGroup(group, id);
	},
	removeGroup: function(id){
		removeGroup(id);
	},
	fetchMember: function(id){
		fetchMember(id);
	},
	fetchTags: function(){
		fetchTags();
	},
	fetchTag: function(id){
		fetchTag(id);
	},
	createTag: function(tag){
		createTag(tag);
	},
	fetchAllEvents: function(timezone){
		fetchAllEvents(timezone);
	},
	fetchSingleEvent: function(id, timezone){
		fetchSingleEvent(id, timezone);
	},
	editEvent: function(id, data){
		editEvent(id, data);
	},
	cancelEvent: function(userId, groupId){
		cancelEvent(userId, groupId);
	},
	joinGroup: function(userId, groupId){
		joinGroup(groupParticipantData(userId, groupId));
	},
	leaveGroup: function(userId, groupId){
		leaveGroup(groupParticipantData(userId, groupId));
	},
	rsvpEvent: function(userId, eventId){
		joinEvent(eventParticipantData(userId, eventId));
	},
	changeRSVP: function(userId, eventId){
		leaveEvent(eventParticipantData(userId, eventId));
	},
	createEvent: function(data){
		createEvent(data);
	},
	fetchAllEventsByDate: function(timezone){
		fetchAllEventsByDate(timezone);
	},
	fetchAllEventsByLocation: function(timezone){
		fetchAllEventsByLocation(timezone)
	}
}

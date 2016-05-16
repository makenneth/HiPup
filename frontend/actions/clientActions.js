var ApiUtil = require('../util/apiUtil');
var groupParticipantData = function(userId, groupId){
		return {
							group_participant: {
								participant_id: userId,
								group_id: groupId
							}
						};
};
var eventParticipantData = function(userId, eventId){
		return {
							event_user: {
								user_id: userId,
								event_id: eventId
							}
						};
};
module.exports = {
	fetchAllGroups: function(timezone){
		ApiUtil.fetchAllGroups(timezone);
	},
	fetchSingleGroup: function(id, timezone){
		ApiUtil.fetchSingleGroup(id, timezone);
	},
	fetchGroupsByLocation: function(miles, coords){
		ApiUtil.fetchCustomGroups(miles, coords, "custom");
	},
	createGroup: function(group){
		ApiUtil.createGroup(group);
	},
	updateGroup: function(group, id){
		ApiUtil.updateGroup(group, id);
	},
	removeGroup: function(id){
		ApiUtil.removeGroup(id);
	},
	fetchMember: function(id){
		ApiUtil.fetchMember(id);
	},
	fetchTags: function(){
		ApiUtil.fetchTags();
	},
	fetchTag: function(id){
		ApiUtil.fetchTag(id);
	},
	createTag: function(tag){
		ApiUtil.createTag(tag);
	},
	fetchAllEvents: function(timezone){
		ApiUtil.fetchAllEvents(timezone);
	},
	fetchSingleEvent: function(id, timezone){
		ApiUtil.fetchSingleEvent(id, timezone);
	},
	editEvent: function(id, data){
		ApiUtil.editEvent(id, data);
	},
	cancelEvent: function(userId, groupId){
		ApiUtil.cancelEvent(userId, groupId);
	},
	joinGroup: function(userId, groupId){
		ApiUtil.joinGroup(groupParticipantData(userId, groupId));
	},
	leaveGroup: function(userId, groupId){
		ApiUtil.leaveGroup(groupParticipantData(userId, groupId));
	},
	rsvpEvent: function(userId, eventId){
		ApiUtil.joinEvent(eventParticipantData(userId, eventId));

	}, //modal on close, on open
	changeRSVP: function(userId, eventId){
		ApiUtil.leaveEvent(eventParticipantData(userId, eventId));
	},
	createEvent: function(data){
		ApiUtil.createEvent(data);
	},
	fetchAllEventsByDate: function(timezone){
		ApiUtil.fetchAllEventsByDate(timezone);
	},
	fetchAllEventsByLocation: function(timezone){
		ApiUtil.fetchAllEventsByLocation(timezone)
	}
}

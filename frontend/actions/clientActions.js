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
	createGroup: function(group){
		ApiUtil.createGroup(group);
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
	fetchAllEvents: function(){
		ApiUtil.fetchAllEvents();
	},
	fetchSingleEvent: function(id){
		ApiUtil.fetchSingleEvent(id);
	},
	joinGroup: function(userId, groupId){
		ApiUtil.joinGroup(groupParticipantData(userId, groupId));
	},
	leaveGroup: function(userId, groupId){
		ApiUtil.leaveGroup(groupParticipantData(userId, groupId));
	},
	joinEvent: function(userId, eventId){
		ApiUtil.joinEvent(eventParticipantData(userId, eventId));

	}, //modal on close, on open
	leaveEvent: function(userId, eventId){
		ApiUtil.leaveEvent(eventParticipantData(userId, eventId));
	},
	createEvent: function(data){
		ApiUtil.createEvent(data);
	}
}




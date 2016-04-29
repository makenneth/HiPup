var AppDispatcher = require('../dispatcher/dispatcher'),
		GroupConstants = require('../constants/groupConstants'),
		MemberConstants = require('../constants/memberConstants'),
		TagConstants = require('../constants/tagConstants'),
		GroupEventConstants = require('../constants/groupEventConstants'),
		UserConstants = require('../constants/userConstants');

module.exports = {
	receivedGroups: function(groups){
		AppDispatcher.dispatch({
			actionType: GroupConstants.RECEIVED_GROUPS,
			groups: groups
		});
	},
	receivedGroup: function(group){
		AppDispatcher.dispatch({
			actionType: GroupConstants.RECEIVED_GROUP,
			group: group
		});
	},
	removedGroup: function(group){
		AppDispatcher.dispatch({
			actionType: GroupConstants.REMOVED_GROUP,
			group: group
		});
	},
	memberFetched: function(member){
		AppDispatcher.dispatch({
			actionType: MemberConstants.MEMBER_FETCHED,
			member: member
		});
	},
	fetchedTags: function(tags){
		AppDispatcher.dispatch({
			actionType: TagConstants.RECEIVED_TAGS,
			tags: tags
		});
	},
	fetchedTag: function(tag){
		AppDispatcher.dispatch({
			actionType: TagConstants.RECEIVED_TAG,
			tag: tag
		});					
	},
	createdTag: function(tag){
		AppDispatcher.dispatch({
			actionType: TagConstants.RECEIVED_TAG,
			tag: tag
		});
	},
	fetchedAllEvents: function(groupEvents){
		AppDispatcher.dispatch({
			actionType: GroupEventConstants.FETCHED_GROUP_EVENTS,
			groupEvents: groupEvents
		})
	},

	fetchedSingleEvent: function(groupEvent){
		AppDispatcher.dispatch({
			actionType: GroupEventConstants.FETCHED_SINGLE_EVENT,
			groupEvent: groupEvent
		})
	},
	joinedGroup: function(currentUser){
		AppDispatcher.dispatch({
			actionType: UserConstants.JOINED_GROUP,
			currentUser: currentUser
		})
	}
};
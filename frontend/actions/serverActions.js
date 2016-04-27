var AppDispatcher = require('../dispatcher/dispatcher'),
		GroupConstants = require('../constants/groupConstants'),
		MemberConstants = require('../constants/memberConstants');

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
	memberFetch: function(user){
		AppDispatcher.dispatch({
			actionType: MemberConstants.MEMBER_FETCHED,
			user: user
		})
	}
};
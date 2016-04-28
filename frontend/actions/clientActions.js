var ApiUtil = require('../util/apiUtil');

module.exports = {
	fetchAllGroups: function(){
		ApiUtil.fetchAllGroups();
	},
	fetchSingleGroup: function(id){
		ApiUtil.fetchSingleGroup(id);
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
	}
}
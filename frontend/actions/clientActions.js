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
	}
}
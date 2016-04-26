var ApiUtil = require('../util/apiUtil');

module.exports = {
	fetchAllGroups: function(){
		ApiUtil.fetchAllGroups();
	},
	fetchSingleGroup: function(id){
		ApiUtil.fetchSingleGroup(id);
	},
	createGroup: function(group){
		console.log("util called");
		ApiUtil.createGroup(group);
	}
}
var ServerActions = require('../actions/serverActions');

module.exports = {
	fetchAllGroups: function() {
		$.ajax({
			method: "GET",
			url: "/api/groups",
			success: function(groups){

			}
		});
	},

	fetchSingleGroup: function(id) {
		$.ajax({
			method: "GET",
			url: "/api/groups/" + id,
			success: function(group) {

			}
		});
	},

	createGroup: function(group){
		$.ajax({
			method: "POST",
			url: "/api/groups",
			data: {group: group},
			dataType: "json",
			success: function(group){
				
			}
		})
	}
};
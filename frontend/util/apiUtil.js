var ServerActions = require('../actions/serverActions');

module.exports = {
	fetchAllGroups: function() {
		$.ajax({
			method: "GET",
			url: "/api/groups",
			success: function(groups){
				ServerActions.receivedGroups(groups);
			}
		});
	},

	fetchSingleGroup: function(id) {
		$.ajax({
			method: "GET",
			url: "/api/groups/" + id,
			success: function(group) {
				ServerActions.receivedGroup(group);
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
				ServerActions.receivedGroup(group);
			}
		});
	},

	editGroup: function(group){
		$.ajax({
			method: "PATCH",
			url: "/api/groups/" + group.id,
			data: {group: group},
			dataType: "json",
			success: function(group){
				ServerActions.receivedGroup(group)
			} 
		});
	},

	removeGroup: function(id){
		$.ajax({
			method: "DELETE",
			url: "/api/groups/" + group.id,
			success: function(group){
				ServerActions.removedGroup(group);
			}
		})
	}
};
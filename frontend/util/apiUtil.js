var ServerActions = require('../actions/serverActions');

module.exports = {
	fetchMember: function(id) {
		$.ajax({
			method: "GET",
			url: "/api/show_users/" + id,
			success: function(user){
				ServerActions.memberFetched(user);
			}
		})
	},
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
	},

	fetchTags: function(){
		$.ajax({
			method: "GET",
			url: "/api/tags",
			success:function(tags){
				ServerActions.fetchedTags(tags);
			}
		});		
	},
	fetchTag: function(id){
		$.ajax({
			method: "GET",
			url: "/api/tags/" + id,
			success:function(tag){
				ServerActions.fetchedTag(tag);
			}
		});
	},

	createTag: function(tag){
		$.ajax({
			method: "POST",
			url: "/api/tags",
			data: {tag: tag},
			dataType: "json",
			success:function(tag){
				ServerActions.createdTag(tag);
			}
		});
	},

	fetchAllEvents: function(){
		$.ajax({
			method: "GET",
			url: "/api/group_events",
			success: function(groupEvents){
				ServerActions.fetchedAllEvents(groupEvents);
			}
		})
	},
	fetchSingleEvent: function(id){
		$.ajax({
			method: "GET",
			url: "/api/group_events/" + id,
			success: function(groupEvent){
				ServerActions.fetchedSingleEvent(groupEvent);
			}
		})
	},
	joinGroup: function(data){
		$.ajax({
			method: "POST",
			url: "/api/group_participants/",
			data: data,
			success: function(currentUser){
				ServerActions.toggledGroup(currentUser);
			},
			error: function(err){
				console.log(err);
			}
		})
	},
	leaveGroup: function(data){
		$.ajax({
			method: "DELETE",
			url: "/api/group_participants/leave",
			data: data,
			success: function(currentUser){
				ServerActions.toggledGroup(currentUser);
			}
		})
	},
	joinEvent: function(data){
		debugger
		$.ajax({
			method: "POST",
			url: "/api/event_users",
			data: data,
			success: function(currentUser){
				debugger;
				ServerActions.toggledEvent(currentUser);
			}
		});
	},

	leaveEvent: function(data){
		$.ajax({
			method: "DELETE",
			url: "/api/event_users/leave",
			data: data,
			success: function(currentUser){
				ServerActions.toggledEvent(currentUser);
			}
		});
	}

};
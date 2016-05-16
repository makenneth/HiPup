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
	fetchAllGroups: function() {
		$.ajax({
			method: "GET",
			url: "/api/groups",
			success: function(groups){
				ServerActions.receivedGroups(groups);
			}
		});
	},
	fetchCustomGroups: function(miles, coords, type){
		$.ajax({
			method: "GET",
			url: "/api/groups",
			data: {user_coord: [coords.latitude, coords.longitude], 
							location_type: type, miles: miles},
			success: function(groups){
				ServerActions.receivedGroups(groups);
			}
		})
	},
	fetchSingleGroup: function(id, timezone) {
		$.ajax({
			method: "GET",
			url: "/api/groups/" + id,
			data: {time_zone: timezone},
			success: function(group) {
				ServerActions.receivedGroup(group);
			}
		});
	},
	removeGroup: function(id){
		$.ajax({
			method: "DELETE",
			url: "/api/groups/" + id,
			success: function(group){
				ServerActions.removedGroup(group);
			}
		})
	},
	updateGroup: function(group, id){
		$.ajax({
			method: "PATCH",
			url: "/api/groups/" + id,
			data: {group: group},
			success: function(group){
				ServerActions.receivedGroup(group);
			},
			error: ServerActions.errorReceived
		})
	},

	createGroup: function(group){
		$.ajax({
			method: "POST",
			url: "/api/groups",
			data: {group: group},
			dataType: "json",
			success: function(group){
				ServerActions.receivedGroup(group);
			},
			error: ServerActions.errorReceived
		});
	},

	removeGroup: function(id){
		$.ajax({
			method: "DELETE",
			url: "/api/groups/" + id,
			success: function(group){
				ServerActions.removedGroup(group);
			},
			error: ServerActions.errorReceived
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
			},
			error: ServerActions.errorReceived
		});
	},
	editEvent: function(id, data){
		$.ajax({
			method: "PATCH",
			url: "/api/group_events/" + id,
			data: {group_event: data},
			success: function(groupEvent){
				ServerActions.fetchedSingleEvent(groupEvent);
			}
		})
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
	fetchSingleEvent: function(id, timeZone){
		$.ajax({
			method: "GET",
			url: "/api/group_events/" + id,
			data: {time_zone: timeZone},
			success: function(groupEvent){
				ServerActions.fetchedSingleEvent(groupEvent);
			}
		})
	},
	fetchAllEventsByDate: function(timezone){
		$.ajax({
			method: "GET",
			url: "/api/group_events",
			data: {query_type: "time", time_zone: timezone},
			success: function(groupEvents){
				ServerActions.fetchedEventsByDate(groupEvents);
			}
		})
	},
	fetchAllEventsByLocation: function(timezone){
		$.ajax({
			method: "GET",
			url: "/api/group_events",
			data: {query_type: "location", time_zone: timezone},
			success: function(groupEvents){
				ServerActions.fetchedEventsByLocation(groupEvents);
			}
		})
	},
	joinGroup: function(data){
		$.ajax({
			method: "POST",
			url: "/api/group_participants",
			data: data,
			success: function(currentUser){
				ServerActions.toggledGroup(currentUser);
			},
			error: ServerActions.errorReceived
		})
	},
	leaveGroup: function(data){
		$.ajax({
			method: "DELETE",
			url: "/api/group_participants/leave",
			data: data,
			success: function(currentUser){
				ServerActions.toggledGroup(currentUser);
			},
			error: ServerActions.errorReceived
		})
	},
	joinEvent: function(data){
		$.ajax({
			method: "POST",
			url: "/api/event_users",
			data: data,
			success: function(currentUser){
				ServerActions.toggledEvent(currentUser);
			},
			error: ServerActions.errorReceived
		});
	},

	leaveEvent: function(data){
		$.ajax({
			method: "DELETE",
			url: "/api/event_users/leave",
			data: data,
			success: function(currentUser){
				ServerActions.toggledEvent(currentUser);
			},
			error: ServerActions.errorReceived
		});
	},

	createEvent: function(data) {
		$.ajax({
			method: "POST",
			url: "/api/group_events",
			data: {group_event: data},
			success: function(event){
				ServerActions.createdEvent(event);
			},
			error: ServerActions.errorReceived
		})
	},
	cancelEvent: function(userId, groupId){
		$.ajax({
			method: "PATCH",
			url: "/api/group_events/" + groupId + "/cancel",
			data: {user_id: userId},
			success: function(group){
				ServerActions.cancelledEvent(group);
			}
		})
	}
};

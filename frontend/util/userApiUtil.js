const UserServerActions = require("../actions/userServerActions");
const ServerActions = require('../actions/serverActions');

module.exports = {
	fetchCurrentUser: function() {
		$.ajax({
			method: "GET",
			url: "/api/user",
			success: UserServerActions.receiveCurrentUser,
			error: UserServerActions.handleErrors
		});
	},
	signUp: function(user) {
		$.ajax({
			method: "POST",
			url: "/api/user",
			data: { user },
			success: UserServerActions.receiveCurrentUser,
			error: UserServerActions.handleErrors
		});
	},
	signIn: function(user) {
		$.ajax({
			type: "POST",
			url: "/api/session",
			data: { user },
			dataType: "json",
			success: (user) => {
				UserServerActions.receiveCurrentUser(user);
			},
			error: UserServerActions.handleErrors
		});
	},
	logOut: function() {
		$.ajax({
			url: "/api/session",
			method: "DELETE",
			dataType: "json",
			success: (data) => {
				UserServerActions.removeCurrentUser();
			},
			error: UserServerActions.handleErrors
		});
	},
	updateUser: function(user) {
		$.ajax({
			url: "/api/user",
			method: "PATCH",
			data: { user },
			success: (data) => {
				UserServerActions.receiveCurrentUser(data);
			},
			error: ServerActions.errorReceived
		})
	},
	findLocationWithIp: function(ip) {
		$.ajax({
			url: "http://ip-api.com/json/" + ip,
			success: (data) => {
				UserServerActions.foundLocation(data);
			}
		})
	}
}

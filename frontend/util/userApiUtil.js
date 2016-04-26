var UserServerActions = require("../actions/userServerActions");

module.exports = {
	fetchCurrentUser: function(){
		$.ajax({
			method: "GET",
			url: "/api/user",
			success: UserServerActions.receiveCurrentUser,
			error: UserServerActions.handleErrors
		});
	},
	signUp: function(user){
		$.ajax({
			method: "POST",
			url: "/api/user",
			data: {user: user},
			success: UserServerActions.receiveCurrentUser,
			error: UserServerActions.handleErrors
		});
	},
	signIn: function(user){
		$.ajax({
			type: "POST",
			url: "/api/session",
			data: {user: user},
			dataType: "json",
			success: function(user){
				UserServerActions.receiveCurrentUser(user);
			},
			error: UserServerActions.handleErrors
		});
	},
	logOut: function(){
		$.ajax({
			url: "/api/session",
			method: "DELETE",
			dataType: "json",
			success: function(data){
				UserServerActions.removeCurrentUser();
			},
			error: UserServerActions.handleErrors
		});
	}
}
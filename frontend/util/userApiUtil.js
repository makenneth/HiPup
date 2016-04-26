var UserActions = require('../actions/userActions');

module.exports = {
	fetchCurrentUser: function(){
		$.ajax({
			method: "GET",
			url: "/api/user",
			success: UserActions.receiveCurrentUser,
			error: UserActions.handleErrors
		})
	},
	signUp: function(user){
		$.ajax({
			method: "POST",
			url: "/api/user",
			data: {user: user},
			success: UserActions.receiveCurrentUser,
			error: UserActions.handleErrors
		})
	},
	signIn: function(user){
		$.ajax({
			method: "POST",
			url: "/api/session",
			data: {user: user},
			success: UserActions.receiveCurrentUser,
			error: UserActions.handleErrors
		})
	},
	logOut: function(){
		$.ajax({
			method: "DELETE",
			url: "/api/session",
			success: UserActions.removeCurrentUser,
			error: UserActions.hanldeErrors
		})
	}
}
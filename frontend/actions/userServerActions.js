var AppDispatcher = require("../dispatcher/dispatcher"),
		UserConstants = require("../constants/userConstants");

module.exports = {
	receiveCurrentUser: function (user){
		AppDispatcher.dispatch({
			actionType: UserConstants.LOGIN,
			user: user
		});
	},
	removeCurrentUser: function (user){
		AppDispatcher.dispatch({
			actionType: UserConstants.LOGOUT
		});
	},
	handleErrors: function (errors){
		AppDispatcher.dispatch({
			actionType: UserConstants.LOGIN,
			errors: errors
		});
	}
};
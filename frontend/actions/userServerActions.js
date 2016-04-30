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
	handleErrors: function (errorObject){
		var errors = JSON.parse(errorObject.responseText);
		AppDispatcher.dispatch({
			actionType: UserConstants.ERROR,
			errors: errors
		});
	}
};
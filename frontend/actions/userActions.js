var AppDispatcher = require("../dispatcher/dispatcher"),
		UserApiUtil = require("../util/userApiUtil"),
		UserConstants = require("../constants/userConstants");

module.exports = {
	fetchCurrentUser: function(){
		UserApiUtil.fetchCurrentUser();
	},
	signUp: function(user){
		UserApilUtil.signUp(user);
	},
	signIn: function(user){
		UserApiUtil.signIn(user);
	},
	logOut: function(){
		UserApiUtil.logOut;
	},
	receiveCurrentUser: function(user){
		AppDispatcher.dispatch({
			actionType: UserConstants.LOGIN,
			user: user
		})
	},
	removeCurrentUser: function(user){
		AppDispatcher.dispatch({
			actionType: UserConstants.LOGOUT
		})
	},
	handleErrors: function(errors){
		AppDispatcher.dispatcher({
			actionType: UserConstants.LOGIN,
			errors: errors
		})
	}
}
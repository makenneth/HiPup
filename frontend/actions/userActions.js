var	UserApiUtil = require("../util/userApiUtil");

module.exports = {
	fetchCurrentUser: function (){
		UserApiUtil.fetchCurrentUser();
	},
	signUp: function (user){
		UserApiUtil.signUp(user);
	},
	signIn: function (user){
		UserApiUtil.signIn(user);
	},
	logOut: function (){
		UserApiUtil.logOut();
	}
};

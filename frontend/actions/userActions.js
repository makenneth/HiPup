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
	},
	updateUser: function(user){
		UserApiUtil.updateUser(user);
	},
	getCityAndState: function(lat, lng){
		UserApiUtil.getCityAndState(lat, lng);
	},
	getTimeZone: function(lat, lng, timestamp){
		UserApiUtil.getTimeZone(lat, lng, timestamp);
	}
};

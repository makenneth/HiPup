import { loadUser } from "./serverActions";
const UserServerActions = require("./userServerActions");
const	UserApiUtil = require("../util/userApiUtil");

module.exports = {
	fetchCurrentUser: function() {
		UserApiUtil.fetchCurrentUser();
	},
	startLoading: function() {
		loadUser();
	},
	signUp: function(user) {
		UserApiUtil.signUp(user);
	},
	signIn: function(user) {
		UserApiUtil.signIn(user);
	},
	logOut: function() {
		UserApiUtil.logOut();
	},
	updateUser: function(user) {
		UserApiUtil.updateUser(user);
	},
	findLocationWithIp: function(ip) {
		UserApiUtil.findLocationWithIp(ip);
	},
	loadLocation: function() {
		UserServerActions.loadLocation();
	}
};

import { LOGIN, LOGOUT, ERROR, FOUND_LOCATION, LOCATION_ERROR, LOAD_LOCATION } from "../constants/constants";
const Dispatcher = require('../dispatcher/dispatcher');

module.exports = {
	receiveCurrentUser: function(user) {
		Dispatcher.dispatch({
			actionType: LOGIN,
			user
		});
	},
	removeCurrentUser: function(user) {
		Dispatcher.dispatch({
			actionType: LOGOUT
		});
	},
	handleErrors: function(errorObject) {
		const errors = JSON.parse(errorObject.responseText);
		Dispatcher.dispatch({
			actionType: ERROR,
			errors
		});
	},
	loadLocation: function() {
		Dispatcher.dispatch({
			actionType: LOAD_LOCATION
		});
	},
	foundLocation: function(data) {
		Dispatcher.dispatch({
			actionType: FOUND_LOCATION,
			data
		});
	},
	findLocationError: function() {
		Dispatcher.dispatch({
			actionType: LOCATION_ERROR
		});
	}
};

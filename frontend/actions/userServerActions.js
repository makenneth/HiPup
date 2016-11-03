import { LOGIN, LOGOUT, ERROR, FOUND_LOCATION } from "../constants/constants";
const Dispatcher = require('../dispatcher/dispatcher');
const dispatch = Dispatcher.dispatch;

module.exports = {
	locationCalled: function() {
		dispatch({
			actionType: "LOCATION_CALLBACK_CALLED"
		})
	},
	receiveCurrentUser: function(user) {
		dispatch({
			actionType: LOGIN,
			user
		});
	},
	removeCurrentUser: function(user) {
		dispatch({
			actionType: LOGOUT
		});
	},
	handleErrors: function(errorObject) {
		const errors = JSON.parse(errorObject.responseText);
		dispatch({
			actionType: ERROR,
			errors
		});
	},
	foundLocation: function(data) {
		dispatch({
			actionType: FOUND_LOCATION,
			data
		});
	}
};

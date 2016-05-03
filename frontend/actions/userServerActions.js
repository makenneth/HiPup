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
	},
	receivedCurrentLocation: function(place) {
		AppDispatcher.dispatch({
			actionType: "LOCATION_RETRIEVED",
			place: place.join(", ")
		})
	},
	receivedCurrentTimeZone: function(timezone) {
		AppDispatcher.dispatch({
			actionType: "TIMEZONE_RETRIEVED",
			timezone: timezone
		})
	}
};
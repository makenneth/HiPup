var UserServerActions = require("../actions/userServerActions"),
		ServerActions = require('../actions/serverActions');

module.exports = {
	fetchCurrentUser: function(){
		$.ajax({
			method: "GET",
			url: "/api/user",
			success: UserServerActions.receiveCurrentUser,
			error: UserServerActions.handleErrors
		});
	},
	signUp: function(user){
		$.ajax({
			method: "POST",
			url: "/api/user",
			data: {user: user},
			success: UserServerActions.receiveCurrentUser,
			error: UserServerActions.handleErrors
		});
	},
	signIn: function(user){
		$.ajax({
			type: "POST",
			url: "/api/session",
			data: {user: user},
			dataType: "json",
			success: function(user){
				UserServerActions.receiveCurrentUser(user);
			},
			error: UserServerActions.handleErrors
		});
	},
	logOut: function(){
		$.ajax({
			url: "/api/session",
			method: "DELETE",
			dataType: "json",
			success: function(data){
				UserServerActions.removeCurrentUser();
			},
			error: UserServerActions.handleErrors
		});
	},
	updateUser: function(data){
		$.ajax({
			url: "/api/user",
			method: "PATCH",
			data: {user: data},
			success: function(data){
				UserServerActions.receiveCurrentUser(data);
			},
			error: ServerActions.errorReceived
		})
	},
	getCityAndState: function(lat, lng){
		$.ajax({
			method: "GET",
			url: "http://maps.googleapis.com/maps/api/geocode/json?latlng=" +
						lat + "," + lng + "&sensor=true",
			dataType: "json",
			success: function(res){
				var result = Array(2);
				res.results[0].address_components.forEach(function(component){
					if ((/locality/).test(component.types[0])){
							result[0] = component.long_name;
					} else if (component.types[0] === "administrative_area_level_1"){
							result[1] = component.short_name;
					}
				});
				UserServerActions.receivedCurrentLocation(result);
			},
			error: ServerActions.errorReceived
		});
	},
	getTimeZone: function(lat, lng, timestamp){
		var url = "https://maps.googleapis.com/maps/api/timezone/json?location=" + 
							lat + "," + lng  + "&timestamp=" + timestamp/1000 + 
							"&key=AIzaSyBFOZ-djLJNV334-1cZmM-nLvPM-gQaw50";
		$.ajax({
			method: "GET",
			url: url,
			success: function(data){
				UserServerActions.receivedCurrentTimeZone(data.timeZoneId);
			}
		})
	}

}
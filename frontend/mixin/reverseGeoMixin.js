module.exports = {
	getInitialState: function() {
		return {
			currentLocation: []
		};
	},
	_getCityAndState: function(lat, lng, callback) {
		$.ajax({
			method: "GET",
			url: "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
				lat + "," + lng + "&sensor=true",
			dataType: "json",
			success: (res) => {
				const result = Array(2);
				res.results[0].address_components.forEach(function(component){
					if ((/locality/).test(component.types[0])) {
							result[0] = component.long_name;
					} else if (component.types[0] === "administrative_area_level_1") {
							result[1] = component.short_name;
					}
				});
				callback(result);
			},
			error: function(){

			}
		})
	}
}
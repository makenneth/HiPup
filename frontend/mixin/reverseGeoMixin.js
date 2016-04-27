module.exports = {
	_getCityAndCountry: function(lat, lng, callback){
		$.ajax({
			method: "GET",
			url: "http://maps.googleapis.com/maps/api/geocode/json?latlng=" +
						lat + "," + lng + "&sensor=true",
			dataType: "json",
			success: function(res){
				var result = Array(2);
				debugger;
				res.results[0].address_components.forEach(function(component){
					if ((/locality/).test(component.types[0])){
							result[0] = component.long_name;
					} else if (component.types[0] === "administrative_area_level_1"){
							result[1] = component.short_name;
					}
				});
				callback(result);
			}
		})
	}
}
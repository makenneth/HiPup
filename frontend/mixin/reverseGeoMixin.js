module.exports = {
	getInitialState: function() {
		return {
			location: [] 
		};
	},
	_setLocation: function(data) {
		if (this.state.location[0] !== data[0] && this.state.location[1] !== data[1]) 
			this.setState({location: data});
	},
	_getCityAndCountry: function(lat, lng, callback){
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
				callback(result);
			},
			error: function(){

			}
		})
	}
}
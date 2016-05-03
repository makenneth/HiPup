
module.exports = {

	getCoords: function(city, state){
		var city = city.replace("/\s/", "+"),
				state = state.replace('/\s/', "+");
		var url = "https://maps.googleapis.com/maps/api/geocode/json?" + 
								"components=locality:" + city + "|administrative_area:" + 
								state + "|country:us&key=AIzaSyDBLpIlf0l0YTDYqk8oNmHbiJldzeKMQKM";
				that = this;
		$.ajax({
			method: "GET",
			url: url,
			success: function(data){
				that.submitForm(data.results[0].geometry.location);
			},
			error: function(err){
				console.log(err);
			}
		})
	}

	
}
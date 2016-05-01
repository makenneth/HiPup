module.exports = {
	componentDidMount: function() {
		var options = {
      types: ['(regions)'],
      componentRestrictions: {country: "us"}
    };
		this.autocomplete = new google.maps.places.Autocomplete(
        document.getElementById("autocomplete"),
        options
        );
  	this.acListener = this.autocomplete.addListener('place_changed', this.fillInAddress);
	},
	fillInAddress: function(){
    var place = this.autocomplete.getPlace();
   	var city = place.adr_address.match(/locality\">(\w+\s?\w+)</),
   			state = place.adr_address.match(/region\">(\w+)</),
   			location = place.geometry.location;
		city = city ? city[1] : "";
		state = state ? state[1] : ""; 
   	this.setState({state: state, city: city, 
   									lat: location.lat(), lng: location.lng()});
  },
  componentWillUnmount: function() {
  	if (this.acListener) this.acListener.remove();
  }
};
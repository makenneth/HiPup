var React = require('react'),
   Geosuggest = require('react-geosuggest');

var EventMap = React.createClass({
	componentDidMount: function(){
    // navigator.geolocation.getCurrentPosition(this.setMarker, this._error);
    var mapDOMNode = this.refs.map;
    var mapOptions = {
      center: {lat: +this.props.lat, lng: +this.props.lng},//get currentLocation
      zoom: 13
    };
    this.map = new google.maps.Map(mapDOMNode, mapOptions);
    new google.maps.Marker({
    	position: new google.maps.LatLng(+this.props.lat, +this.props.lng)
    }).setMap(this.map);
  },
  error: function(err) {
  	console.log(err);
  },
    onSuggestSelect: function(suggest) {
    console.log(suggest);
  },
	render: function() {
    return (
      <div>
        <div>
        </div>
				<div className="map" ref="map">
				</div>
			</div>
		);
	}

});

module.exports = EventMap;
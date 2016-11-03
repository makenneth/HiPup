const React = require('react');

const EventMap = React.createClass({
	componentDidMount: function(){
    const mapDOMNode = this.refs.map;
    const mapOptions = {
      center: {
        lat: +this.props.lat,
        lng: +this.props.lng
      },
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
				<div className="map" ref="map">
				</div>
			</div>
		);
	}
});

module.exports = EventMap;

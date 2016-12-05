import React, { Component } from "react";
export default class Map extends Component {
  componentDidMount() {
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
  }
  render() {
    return (
      <div>
        <div className="map" ref="map">
        </div>
      </div>
    );
  }
};

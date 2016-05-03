var React = require('react'),
		ClientAction = require('../../actions/clientActions'),
		GroupEventStore = require('../../stores/groupEventStore'),
		HashHistory = require('react-router').hashHistory;

var NewEventForm = React.createClass({
	getInitialState: function() {
		var d = new Date();
		return {
			title: "",
			date: "",
			time: "",
			description: "",
			street: "",
			city: "",
			state: "",
			zip: "",
			lat: "",
			lng: "",
			group_id: ""
		};
	},
	componentDidMount: function() {
		var options = {
			types: ['address'],
			componentRestrictions: {country: "us"}
		};
		this.autocomplete = new google.maps.places.Autocomplete(
			document.getElementById("autocomplete"),
			options);
		this.nefListener = this.autocomplete.addListener('place_changed', this.parseAddress);
		this.gesListener = GroupEventStore.addListener(this._createdEvent); //this would potentially cause bugs
		//but if I add enough validations
	},
	componentWillUnmount: function() {
		if (this.nefListener) this.nefListener.remove();
		if (this.gesListener) this.gesListener.remove();
	},
	parseAddress: function() {
		var places = this.autocomplete.getPlace();
		if (!places) return;
		var address = places.adr_address;
		var location = places.geometry.location;
		var street, city, state, zip, lat, lng;
		street = address.match(/-address\">(.*?)</),
		city = address.match(/locality\">(.*?)</),
		state = address.match(/region\">(.*?)</),
		zip = address.match(/postal-code\">(.*?)</);
		this.setState({
			street: street ? street[1] : "",
			city: city ? city[1] : "",
			state: state ? state[1] : "",
			zip: zip ? zip[1] : "",
			lat: street ? location.lat() : 0,
			lng: street ? location.lng() : 0 
		})
	},
	_createdEvent: function(id) {
		HashHistory.push("events/" + GroupEventStore.last());
	},
	updateField: function(field, e){
		var fieldObj = {}
		fieldObj[field] = e.target.value;
		this.setState(fieldObj);
	},
	handleSubmit: function(e) {
		e.preventDefault();
		this.state.group_id = this.props.groupId;
		ClientAction.createEvent(this.state);
	},
	render: function() {
		return (
			<div>
				<div>New Event</div>
				<form className="event-form" onSubmit={this.handleSubmit} >
						<label for="title">Title</label>
						<input type="text" id="title" 
									 value={this.state.title} onChange={this.updateField.bind(null, "title")} />
						<label for="description">Description</label>
						<textarea id="descrption" value={this.state.description} 
											onChange={this.updateField.bind(null, "description")}/>
						<label for="date">Date</label>
						<input type="date" id="date" 
									 value={this.state.date} onChange={this.updateField.bind(null, "date")} />
 						<label for="time">Time</label>
						<input type="time" id="time" 
									 value={this.state.time} onChange={this.updateField.bind(null, "time")} />
						<label for="autocomplete">Street Address</label>
						<input type="text" id="autocomplete" 
									 value={this.state.street} onChange={this.updateField.bind(null, "street")} />
						<label for="city">City</label>
						<input type="text" id="city" 
									 value={this.state.city} onChange={this.updateField.bind(null, "city")} />
						<label for="state">State</label>
						<input type="text" id="state" 
									 value={this.state.state} onChange={this.updateField.bind(null, "state")} />

						<label for="zip">Zip</label>
						<input type="text" id="zip" 
									 value={this.state.zip} onChange={this.updateField.bind(null, "zip")} />
						<input type="submit" onSubmit={this.handleSubmit} value="New Event" />
				</form>
			</div>
		);
	}

});

module.exports = NewEventForm;
var React = require('react'),
		ReactDOM = require('react-dom'),
		GroupStore = require('../../stores/groupStore'),
		QueryGroupStore = require('../../stores/queryGroupStore'),
		ClientActions = require('../../actions/clientActions'),
		GroupIndexItem = require('./groupIndexItem'),
		Search = require('../search/search'),
		Modal = require('react-modal'),
		SearchStyle = require('../../modal/searchStyle'),
		ReactCSSTransitionGroup = require('react-addons-css-transition-group'),
		EventIndexByDate = require('../events/eventIndexByDate'),
		DateModalStyle = require('../../modal/dateModalStyle'),
		CurrentUserState = require('../../mixin/currentUserState'),
		UserStore = require("../../stores/userStore"),
		SearchMixin = require('../../mixin/searchMixin');


var banner = "https://images.unsplash.com/photo-1443750200537-00fd518bdc82?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=1080&fit=max&s=ad7a9ff44b3026fcf49d80830ffb20ee";

var GroupIndex = React.createClass({
	mixins: [CurrentUserState, SearchMixin],
	getInitialState: function() {
		return {
			groups: [],
			tagSearchModalOpen: false,
			searchString: "",
			dateModalIsOpen: false,
			searchBarOpen: false,
			distanceSearchOpen: false,
			tag: null,
			miles: 0,
			locationServiceError: ""
		};
	},
	selectTag: function(tag){
		this.setState({tag: tag});
	},
	cancelTag: function(){
		this.setState({tag: null});
	},
	componentDidMount: function() {
		this.groupIndexListener = GroupStore.addListener(this._onLoad);
		this.qgsListener = QueryGroupStore.addListener(this._fetchedLocationQuery);
		ClientActions.fetchAllGroups();
	},
	_fetchedLocationQuery: function() {
		this.setState({groups: QueryGroupStore.findGroups(this.state.miles)});
	},
	_onLoad: function() {
		this.setState({groups: GroupStore.all()});
	},
	componentWillUnmount: function() {
		if (this.groupIndexListener){
			this.groupIndexListener.remove();
		}
		$("#search-box").off("keyup");
		$(".search-bar").off("click");
	},
	setSearchString: function(e) {
		this.setState({searchString: e.target.value});
	},
	openTagSearchModal: function(){
		this.setState({ tagSearchModalOpen: true });
	},
	closeTagSearchModal: function() {
		this.setState({ tagSearchModalOpen: false });
	},
	openDateModal: function() {
		this.setState({ dateModalIsOpen: true });
	},
	closeDateModal: function() {
		this.setState({dateModalIsOpen: false});
	},
	openSearchBar: function(e){
		this.setState({searchBarOpen: true});
	},
	changeDistance: function(e){
		if (e.target.value === "--"){
			this.setState({miles: "--", groups: GroupStore.all()})
			return;
		}

		var selectedMiles = +e.target.value;

		this.setState({miles: selectedMiles});
		this.fetchGroupsByLocation(selectedMiles);
	},

	fetchGroupsByLocation: function(miles){
		var groups = QueryGroupStore.findGroups(miles);
		if (groups){
			this.setState({groups: groups});
		} else {
			var usersLocation = UserStore.currentLocation().coords;
			if (usersLocation.latitude){
				ClientActions.fetchGroupsByLocation(miles, usersLocation);
			} else {
				this._toggleLocationService();
				setTimeout(this._toggleLocationService, 2000);		
			}
		}
	},
	_toggleLocationService: function(){
		if (this.state.locationServiceError.length){
			this.setState({locationServiceError: ""});
		} else {
			this.setState({locationServiceError: "Location Service isn't available"});
		}
	},
	openDistanceSearch: function(){
		this.setState({distanceSearchOpen: true});
	},
	render: function() {
		var searchCriteria = this.state.searchString.toLowerCase().trim();
		var that = this;
		var libraries = this.state.groups.filter(function(group){
			if (that.state.tag){
				return group.title.toLowerCase().match(searchCriteria) && 
									group.tags.some(function(tag){ 
										return tag.name === that.state.tag; 
									});
			} else {
				return group.title.toLowerCase().match(searchCriteria);
			}
		});
		return (
			<div>
				<div className="banner"><div className="logo">HiPup</div></div>
				<div className="search-bar">
						{this.searchByDistanceIcon()}
						<div className="divider"></div>
						{this.searchByTagDiv()}
						<div className="divider"></div>
					 {this.searchContainer()}
						<div className="divider"></div>

					<div className="calendar" onClick={this.openDateModal} />
				</div>

				<Modal isOpen={ this.state.dateModalIsOpen }
							 onRequestClose={this.closeDateModal}
							 style={DateModalStyle}>
							<EventIndexByDate closeModal={this.closeDateModal} />
				 </Modal>
				<div className="group-index cf">
					{
						libraries.map(function(group){
							return <GroupIndexItem group={group} key={group.id} />;
						})
					}
				</div>
				<footer>
				  <div className="my-name">Kenneth Ma</div>
					<a href="https://github.com/makenneth"><div className="git-logo"></div></a>
					<a href="https://www.linkedin.com/in/kenneth-ma-a813b3116"><div className="link-logo"></div></a>
				</footer>
			</div>
		);
	}

});

module.exports = GroupIndex;

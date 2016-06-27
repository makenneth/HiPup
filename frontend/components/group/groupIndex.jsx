var React = require('react'),
		ReactDOM = require('react-dom'),
		GroupStore = require('../../stores/groupStore'),
		QueryGroupStore = require('../../stores/queryGroupStore'),
		ClientActions = require('../../actions/clientActions'),
		GroupIndexItem = require('./groupIndexItem'),
		Modal = require('react-modal'),
		TagIndex = require("../tag/tagIndex"),
		SearchStyle = require('../../modal/searchStyle'),
		ReactCSSTransitionGroup = require('react-addons-css-transition-group'),
		EventIndexByDate = require('../events/eventIndexByDate'),
		DateModalStyle = require('../../modal/dateModalStyle'),
		CurrentUserState = require('../../mixin/currentUserState'),
		UserStore = require("../../stores/userStore"),
		TagStore = require("../../stores/tagStore"),
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
			tags: TagStore.all() || [],
			selectedTags: {},
			miles: 25,
			locationServiceError: ""
		};
	},
	_changeSelectedTags: function(id){
		var selectedTags = this.state.selectedTags;
		selectedTags[id] = selectedTags[id] ? false : true;
		this.setState({selectedTags: selectedTags});
	},
	setAllTags: function(bool){
		var selectedTags = this.state.selectedTags;
		for (var key in selectedTags){
			if (selectedTags.hasOwnProperty(key)){
				selectedTags[key] = bool;
			}
		}
		this.setState({selectedTags: selectedTags});
	},
	selectAllTags: function() {
		this.setAllTags(true);
	},
	deselectAllTags: function() {
		this.setAllTags(false);
	},
	componentDidMount: function() {
		//also add a listener for location error
		//if receive error, fetch all groups without locations
		this.groupIndexListener = GroupStore.addListener(this._onLoad);
		this.tagIdxListener = TagStore.addListener(this._onReceiveTags);

		if (UserStore.currentLocation().coords.latitude){
			if (!this.state.groups.length){
				ClientActions.fetchAllGroups(UserStore.currentLocation().coords);
			} else {
				this._onReceiveTags();
			}
		} else {
			this.usStoreListener = UserStore.addListener(this._checkedUserLocation);
			this._checkedUserLocation();
		}
		
		if (!this.state.tags.length) ClientActions.fetchTags();
	},
	_checkedUserLocation: function() {
		ClientActions.fetchAllGroups(UserStore.currentLocation().coords);
	},

	_onLoad: function() {
		this.setState({groups: GroupStore.findAllWithDistance(this.state.miles)});
	},
	_onReceiveTags: function(){
		var selectedTags = this.state.selectedTags,
				tags = TagStore.all();

		tags.forEach(function(tag){
			selectedTags[tag.id] = true;
		})

		this.setState({
			tags: tags,
			selectedTags: selectedTags
		});

	},
	componentWillUnmount: function() {
		if (this.groupIndexListener) this.groupIndexListener.remove(); 
		if (this.tagIdxListener) this.tagIdxListener.remove();
		if (this.usStoreListener) this.usStoreListener.remove();
	},
	setSearchString: function(e) {
		this.setState({searchString: e.target.value});
	},
	openDateModal: function() {
		this.setState({ dateModalIsOpen: true });
	},
	closeDateModal: function() {
		this.setState({dateModalIsOpen: false});
	},
	changeDistance: function(e){
		var selectedMiles = +e.target.value;
		this.setState({
			miles: selectedMiles,
			groups: GroupStore.findAllWithDistance(selectedMiles)
		});
	},

	_toggleLocationService: function(){
		if (this.state.locationServiceError.length){
			this.setState({locationServiceError: ""});
		} else {
			this.setState({locationServiceError: "Location Service isn't available"});
		}
	},

	searchTooltip: function(){
    return <div className="search-tooltip"><div className="search-container-sm cf">
	    <img className="search-icon-sm" src="/search-icon-2.png"/>
	    <input id="search-box" type="text" onChange={this.setSearchString}
	           autoFocus value={this.state.searchString} placeholder="Find a pet event"/>
	    </div></div>;
	},
	locationTooltip: function() {
		return <div className="location-tooltip">
			<p>Searching within { this.state.miles } Miles</p>
			<input id="distance-range"type="range" min="25"
						 max="200" value={ this.state.miles } onChange={ this.changeDistance } />
		</div>
	},
	tagTooltip: function() {
		return <TagIndex changeSelectedTags={this._changeSelectedTags}
											tags={this.state.tags} 
											selectedTags={this.state.selectedTags}
											selectAllTags={this.selectAllTags}
											deselectAllTags={this.deselectAllTags}/>
	},
	mainNav: function() {
		if (this.props.location.pathname === "/")
			return	<MainNav userButtons={ this.props.userButtons }
						openDateModal={this.openDateModal} 
						searchTooltip={this.searchTooltip}
						tagTooltip ={ this.tagTooltip } 
						locationTooltip={ this.locationTooltip } />
	},
	groupIndex: function(libraries) {
		if (libraries.length){
			return <div className="group-index cf">
						{
							libraries.map(function(group){
							  return <GroupIndexItem group={group} key={group.id} />;
						  })
						}
						</div>
		} else {
			return <div className="group-index cf">
				<h1>There are no events within
			{ " " + this.state.miles + " miles of " + UserStore.currentLocation().place + " :(" }
				</h1>
			</div>;
		}

	},
	render: function() {
		var searchCriteria = this.state.searchString.toLowerCase().trim();
		var that = this;

		var libraries = this.state.groups.filter(function(group){
				return group.title.toLowerCase().match(searchCriteria) && 
									group.tags.some(function(tag){
										return that.state.selectedTags[tag.id];
									})
		});
		return (
			<div>
				<div className="banner-img">
					<div className="logo">HiPup</div><span className="tagline">Playdates for pets</span>
				</div>
				<div className="banner"></div>
				{ this.mainNav() }
				<Modal isOpen={ this.state.dateModalIsOpen }
							 onRequestClose={this.closeDateModal}
							 style={DateModalStyle}>
							<EventIndexByDate closeModal={this.closeDateModal} />
				 </Modal>
				<div className="group-index-body">
					{
						this.groupIndex(libraries)
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

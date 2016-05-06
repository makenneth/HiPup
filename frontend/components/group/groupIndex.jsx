var React = require('react'),
		GroupStore = require('../../stores/groupStore'),
		ClientActions = require('../../actions/clientActions'),
		GroupIndexItem = require('./groupIndexItem'),
		Search = require('../search/search'),
		Modal = require('react-modal'),
		SearchStyle = require('../../modal/searchStyle'),
		TagIndex = require('../tag/tagIndex'),
		ReactCSSTransitionGroup = require('react-addons-css-transition-group'),
		EventIndexByDate = require('../events/eventIndexByDate'),
		DateModalStyle = require('../../modal/dateModalStyle'),
		CurrentUserState = require('../../mixin/CurrentUserState'),
		UserStore = require("../../stores/userStore");

var banner = "https://images.unsplash.com/photo-1443750200537-00fd518bdc82?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=1080&fit=max&s=ad7a9ff44b3026fcf49d80830ffb20ee";

var GroupIndex = React.createClass({
	mixins: [CurrentUserState],
	getInitialState: function() {
		return {
			groups: [],
			tagSearchModalOpen: false,
			searchString: "",
			dateModalIsOpen: false,
			searchBarOpen: false,
			tag: null
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
		if (this.state.currentUser){
			ClientActions.fetchAllGroups({type: closest});
		} else {
			ClientActions.fetchAllGroups({})
		}
	},
	_onLoad: function() {
		this.setState({groups: GroupStore.all()});
		ClientActions.fetchAllGroups();
	},
	componentWillUnmount: function() {
		if (this.groupIndexListener){
			this.groupIndexListener.remove();
		}
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
	searchContainer: function(){
		if (this.state.searchBarOpen){
			return (<div className="search-container-sm cf">
			<img className="search-icon-sm" src="/search-icon-2.png"/>
			<input id="search-box" type="text" onChange={this.setSearchString}
						 value={this.state.searchString} placeholder="Type your search..."/>
		 	</div>)	
		} else {
			return (
				<div className="search-icon-main" onClick={this.openSearchBar}></div>
				) 
		}
	},
	searchByTagDiv: function(){
		if (this.state.tag){
			return (<div className="searching-by-tag">Searching By: {this.state.tag} <p onClick={this.cancelTag}>Cancel Search</p></div>);
		} else {
		 return (<div className="search-by-tag" onClick={this.openTagSearchModal}>
		 		<div className="tag-index"><TagIndex selectTag={this.selectTag} /></div>
		 </div>);
		}
	},
	render: function() {
		var searchCriteria = this.state.searchString.trim();
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
			</div>
		);
	}

});

module.exports = GroupIndex;

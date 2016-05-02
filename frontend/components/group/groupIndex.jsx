var React = require('react'),
		GroupStore = require('../../stores/groupStore'),
		ClientActions = require('../../actions/clientActions'),
		GroupIndexItem = require('./groupIndexItem'),
		Search = require('../search/search'),
		Modal = require('react-modal'),
		SearchStyle = require('../../modal/searchStyle'),
		TagIndex = require('../tag/tagIndex'),
		ReactCSSTransitionGroup = require('react-addons-css-transition-group');

var banner = "https://images.unsplash.com/photo-1443750200537-00fd518bdc82?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=1080&fit=max&s=ad7a9ff44b3026fcf49d80830ffb20ee";

var GroupIndex = React.createClass({
	getInitialState: function() {
		return {
			groups: [],
			tagSearchModalOpen: false,
			searchString: ""
		};
	},
	componentDidMount: function() {
		this.groupIndexListener = GroupStore.addListener(this._onLoad);
		ClientActions.fetchAllGroups();
	},
	_onLoad: function() {
		this.setState({groups: GroupStore.all()});
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
	render: function() {
		var searchCriteria = this.state.searchString.trim();
		var libraries = this.state.groups.filter(function(group){
			return group.title.toLowerCase().match(searchCriteria);
		});
		return (
			<div>
				<div className="banner"></div>
				<div className="search-bar">
					 <div className="search-by cf">
					 	<h5 onClick={this.openTagSearchModal}>
					 			Search By Tags
					 	</h5>
					 </div> 
					<div className="search-container-sm cf">
						<img className="search-icon-sm"
									src="http://www.endlessicons.com/wp-content/uploads/2015/08/search-icon-2.png"/>
						<input type="text" onChange={this.setSearchString} 
									 value={this.state.searchString} placeholder="Type your search..."/>
					 </div>
					 <div className="calendar-icon">
					 </div>
				</div>
				<Modal isOpen={ this.state.tagSearchModalOpen } 
							 onRequestClose={this.closeTagSearchModal}
							 style={SearchStyle}>
					<TagIndex closeModal={this.closeTagSearchModal}/>
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
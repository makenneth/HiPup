var React = require('react'),
		GroupStore = require('../../stores/groupStore'),
		ClientActions = require('../../actions/clientActions'),
		GroupIndexItem = require('./groupIndexItem'),
		Search = require('../search/search'),
		Modal = require('react-modal'),
		SearchStyle = require('../../modal/searchStyle'),
		TagIndex = require('../tag/tagIndex');
var banner = "http://cdn.thebolditalic.com/paperclip/articles/6006/rect_images/original/Lantern2800.png?1412726396";
var banner = "https://images.unsplash.com/photo-1443750200537-00fd518bdc82?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&w=1080&fit=max&s=ad7a9ff44b3026fcf49d80830ffb20ee";

var GroupIndex = React.createClass({
	getInitialState: function() {
		return {
			groups: [],
			searchModalOpen: false,
			tagSearchModalOpen: false,
			searchString: ""
		};
	},
	componentDidMount: function() {
		GroupStore.addListener(this._onLoad);
		ClientActions.fetchAllGroups();
	},
	_onLoad: function() {
		this.setState({groups: GroupStore.all()});
	},
	openSearchModal: function(e){
		this.setState({ searchModalOpen: true, searchString: e.target.value});
	},
	closeSearchModal: function() {
		this.setState({ searchModalOpen: false });
	},
	openTagSearchModal: function(){
		this.setState({ tagSearchModalOpen: true });
	},
	closeTagSearchModal: function() {
		this.setState({ tagSearchModalOpen: false });
	},
	render: function() {
		return (
			<div>
				<div className="banner"><img src={banner} /></div>
				<div className="search-bar">
					<div className="search-container-sm cf">
						<img className="search-icon-sm"
									src="http://www.endlessicons.com/wp-content/uploads/2015/08/search-icon-2.png"/>
						<input type="text" onChange={this.openSearchModal} 
									 value={this.state.searchString} placeholder="Type your search..."/>
					 </div>
					 <div className="search-by cf">
					 	<h5>
					 		<a onClick={this.openTagSearchModal}>
					 			Search By Tags
					 		</a>
					 	</h5>
					 </div> 
				</div>
				<Modal isOpen={ this.state.searchModalOpen } 
							 onRequestClose={this.closeSearchModal}
							 style={SearchStyle}>
					<Search groups={ this.state.groups } 
									searchString={ this.state.searchString } 
									closeModal={this.closeSearchModal}/>
				</Modal>
				<Modal isOpen={ this.state.tagSearchModalOpen } 
							 onRequestClose={this.closeTagSearchModal}
							 style={SearchStyle}>
					<TagIndex closeModal={this.closeTagSearchModal}/>
				</Modal>
				<div className="group-index cf">
					{
						this.state.groups.map(function(group){
							return <GroupIndexItem group={group} key={group.id} />;
						})
					}
				</div>
			</div>
		);
	}

});

module.exports = GroupIndex;
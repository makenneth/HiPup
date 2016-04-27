var React = require('react'),
		GroupStore = require('../../stores/groupStore'),
		ClientActions = require('../../actions/clientActions'),
		GroupIndexItem = require('./groupIndexItem');
var banner = "http://cdn.thebolditalic.com/paperclip/articles/6006/rect_images/original/Lantern2800.png?1412726396";

var GroupIndex = React.createClass({
	getInitialState: function() {
		return {
			groups: [] 
		};
	},
	componentDidMount: function() {
		GroupStore.addListener(this._onLoad);
		ClientActions.fetchAllGroups();
	},
	_onLoad: function() {
		this.setState({groups: GroupStore.all()});
	},
	render: function() {
		return (
			<div>
				<div className="banner"><img src={banner} /></div>
				<h3>This is the Group Index page</h3>
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
const React = require('react');
const ReactRouter = require('react-router');
const NewGroupForm = require('./components/group/newGroupForm');
const GroupDetail = require('./components/group/groupDetail');
const GroupIndex = require('./components/group/groupIndex');
const GroupHome = require('./components/group/groupHome');
const GroupMembers = require('./components/group/groupMembers');
const GroupEvents = require('./components/group/groupEvents');
const TagShow = require('./components/tag/tagShow');
const EventShow = require('./components/events/eventShow');
const ManageEvents = require('./components/user/manageEvents');
const App = require('./app');
const CurrentUserProfile = require('./components/user/currentUserProfile');

const Route = ReactRouter.Route;
const Router = ReactRouter.Router;
const IndexRoute = ReactRouter.IndexRoute;
const HashHistory = ReactRouter.hashHistory;

module.exports = () => {
  return (<Router history={HashHistory}>
  <Route path="/" component={App}>
    <IndexRoute component={GroupIndex} />
    <Route path="groups" component={GroupIndex} />
    <Route path="user/profile" component={CurrentUserProfile} />
    <Route path="user/events" component={ManageEvents} />
    <Route path="tags/:tagId" component={TagShow} />
    <Route path="groups/new" component={NewGroupForm} />
    <Route path="groups/:groupId" component={GroupDetail}>
      <Route path="home" component={GroupHome}/>
      <Route path="events/:eventId" component={EventShow} />
    </Route>
  </Route>
</Router>);
}

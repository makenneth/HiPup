var React = require('react'),
    ReactRouter = require('react-router'),
    Route = ReactRouter.Route,
    Router = ReactRouter.Router,
    IndexRoute = ReactRouter.IndexRoute,
    HashHistory = ReactRouter.hashHistory,
    NewGroupForm = require('./components/group/newGroupForm'),
    GroupDetail = require('./components/group/groupDetail'),
    GroupIndex = require('./components/group/groupIndex'),
    GroupHome = require('./components/group/groupHome'),
    GroupMembers = require('./components/group/groupMembers'),
    GroupEvents = require('./components/group/groupEvents'),
    TagShow = require('./components/tag/tagShow'),
    EventShow = require('./components/events/eventShow'),
    ManageEvents = require('./components/user/manageEvents'),
    App = require('./app'),
    CurrentUserProfile = require('./components/user/currentUserProfile');
    // <Route path="session/new" component={LogInForm} />
    // <Route path="user/new" component={SignUpForm} />

module.exports = function(){
  return <Router history={HashHistory}>
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
</Router>;
}

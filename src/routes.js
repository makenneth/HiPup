import React from "react";
import { Route, IndexRoute } from "react-router";
import { Main, GroupIndex } from "containers";
// import { isAuthLoaded, loadAuth } from "redux/modules/auth";

export default () => {
  return (
    <Route path="/" component={Main}>
      <IndexRoute component={GroupIndex} />
      <Route path="groups" component={GroupIndex} />
      <Route path="groups/:groupId" component={GroupDetail}>
        <Route path="home" component={GroupHome}/>
        <Route path="events/:eventId" component={EventShow} />
      </Route>
    </Route>
  );
};
      // <Route path="user/profile" component={UserProfile} />
      // <Route path="user/events" component={ManageEvents} />
      // <Route path="tags/:tagId" component={TagShow} />
      // <Route path="groups/new" component={NewGroupForm} />


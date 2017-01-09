import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { NewGroupForm } from 'components';
import { Main, GroupIndex, GroupHome, GroupDetail } from 'containers';
// import { isAuthLoaded, loadAuth } from "redux/modules/auth";

export default () => {
  return (
    <Route path="/" component={Main}>
      <IndexRoute component={GroupIndex} />
      <Route path="groups/new" component={NewGroupForm} />
      <Route path="groups/:groupId" component={GroupDetail}>
        <IndexRoute component={GroupHome} />
      </Route>
      <Route path="groups" component={GroupIndex} />
    </Route>
  );
};
        // <Route path="events/:eventId" component={EventShow} />
      // <Route path="user/profile" component={UserProfile} />
      // <Route path="user/events" component={ManageEvents} />
      // <Route path="tags/:tagId" component={TagShow} />


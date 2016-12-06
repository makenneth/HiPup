import React from "react";
import { Route, IndexRoute } from "react-router";
import { Main } from "containers";
import { Confirmation } from "components";
import { isAuthLoaded, loadAuth } from "redux/modules/auth";

export default ({ getState, dispatch }) => {
  const checkLogIn = (nextState, replace, callback) => {
    if (isAuthLoaded(getState().auth)) {
      checkAuth();
    } else {
      dispatch(loadAuth()).then(checkAuth);
    }
  };

  return (
    <Route path="/" component={App}>
      <IndexRoute component={GroupIndex} />
      <Route path="groups" component={GroupIndex} />
      <Route path="user/profile" component={UserProfile} />
      <Route path="user/events" component={ManageEvents} />
      <Route path="tags/:tagId" component={TagShow} />
      <Route path="groups/new" component={NewGroupForm} />
      <Route path="groups/:groupId" component={GroupDetail}>
        <Route path="home" component={GroupHome}/>
        <Route path="events/:eventId" component={EventShow} />
      </Route>
    </Route>
  );
};

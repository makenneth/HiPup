import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { NewGroupForm } from 'components';
import {
  Main,
  GroupIndex,
  GroupHome,
  GroupDetail,
  UserProfile,
  ManageEvents,
} from 'containers';
import { isLoaded as isAuthLoaded, loadAuth } from 'redux/modules/auth';

export default (store) => {
  const requireLoggedIn = (nextState, replace, callback) => {
    const checkAuth = () => {
      const state = store.getState();
      const user = state.auth.get('user');
        if (!user) {
          replace('/');
        }
        callback();
    };

    if (!isAuthLoaded(store.getState())) {
      store.dispatch(loadAuth());
    } else {
      checkAuth();
    }

    callback();
  };

  return (
    <Route path="/" component={Main}>
      <IndexRoute component={GroupIndex} />
      <Route path="groups/new" component={NewGroupForm} />
      <Route path="groups/:groupId" component={GroupDetail}>
        <IndexRoute component={GroupHome} />
      </Route>
      <Route path="groups" component={GroupIndex} />
      <Route onEnter={requireLoggedIn}>
        <Route path="user/events" component={ManageEvents} />
        <Route path="user/profile" component={UserProfile} />
      </Route>
    </Route>
  );
};
        // <Route path="events/:eventId" component={EventShow} />
      // <Route path="tags/:tagId" component={TagShow} />


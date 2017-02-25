import { combineReducers } from 'redux';
import { reducer as reduxAsyncConnect } from 'redux-async-connect';
import geolocation from './geolocation';
import auth from './auth';
import form from './form';
import groupEvents from './groupEvents';
import eventDetail from './eventDetail';
import groups from './groups';
import group from './group';
import success from './success';
import confirmation from './confirmation';
import tags from './tags';
import query from './query';
import common from './common';
import members from './members';

export default combineReducers({
  reduxAsyncConnect,
  geolocation,
  form,
  auth,
  groups,
  group,
  eventDetail,
  groupEvents,
  success,
  confirmation,
  tags,
  common,
  members,
  query,
});

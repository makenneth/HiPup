import { combineReducers } from 'redux';
import { reducer as reduxAsyncConnect } from 'redux-async-connect';
import geolocation from './geolocation';
import auth from './auth';
import form from './form';
import groupEvents from './groupEvents';
import groups from './groups';
import group from './group';
import success from './success';
import confirmation from './confirmation';
import tags from './tags';
import query from './query';

export default combineReducers({
  reduxAsyncConnect,
  geolocation,
  form,
  auth,
  groups,
  group,
  groupEvents,
  success,
  confirmation,
  tags,
  query,
});

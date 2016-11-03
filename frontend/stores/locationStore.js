import { FOUND_LOCATION, LOCATION_ERROR, LOAD_LOCATION } from '../constants/constants';

const Store = require("flux/utils").Store;
const AppDispatcher = require("../dispatcher/dispatcher");
const LocationStore = new Store(AppDispatcher);

let locationError = false;
let loaded = false;
let loading = true;

const _currentLocation = {
  place: "",
  coords: {},
  timeZone: "America/Los_Angeles"
};

const _setCurrentLocation = (location) => {
  _currentLocation.coords.latitude = location.lat;
  _currentLocation.coords.longitude = location.lon;
  _currentLocation.place = [location.city, location.region].join(", ");
  _currentLocation.timeZone = location.timeZone;
  LocationStore.__emitChange();
};

LocationStore.currentLocation = function() {
  return _currentLocation;
};
LocationStore.hasError = function() {
  return locationError;
};

LocationStore.hasLoaded = function() {
  return loaded;
};


LocationStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case LOAD_LOCATION:
      loading = true;
      LocationStore.__emitChange();
      break;
    case FOUND_LOCATION:
      loaded = true;
      loading = false;
      _setCurrentLocation(payload.data);
      LocationStore.__emitChange();
      break;
    case LOCATION_ERROR:
      locationError = true;
      loaded = true;
      loading = false;
      LocationStore.__emitChange();
      break;
  }
};
export const hasError = () => {
  return locationError;
};
module.exports = LocationStore;

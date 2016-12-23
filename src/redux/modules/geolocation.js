import { fromJS } from 'immutable';
import { LOAD_AUTH_SUCCESS } from './auth';
import { Request } from 'helpers';

const FETCHING_LOCATION = 'hp/location/FETCHING_LOCATION';
const FETCHED_LOCATION = 'hp/location/FETCHED_LOCATION';
const SET_LOCATION = 'hp/location/SET_LOCATION';
const FETCHED_FAILED = 'hp/location/FETCHED_FAILED';

const intialState = fromJS({
  loading: false,
  loaded: false,
  accurate: false,
  location: {
    place: null,
    coords: {
      lat: null,
      lng: null,
    }
  },
  error: null,
});

export default (state = intialState, action) => {
  switch (action.type) {
    case LOAD_AUTH_SUCCESS: {
      if (!state.get('accurate')) {
        return state.setIn(['location', 'coords'], action.payload);
      }
    }
    case FETCHING_LOCATION:
      return state.set('loading', true);
    case SET_LOCATION:
      return state
      .setIn(['location', 'coords'], action.payload)
      .set('accurate', true);
    case FETCHED_LOCATION:
      return state.merge({
        loaded: true,
        location: action.payload
      });
    case FETCHED_FAILED:
      return state.merge({
        loaded: true,
        error: action.payload
      });
    default:
      return state;
  }
};

export const loadLocation = () => {
  return {
    types: [FETCHING_LOCATION, FETCHED_LOCATION, FETCHED_FAILED],
    promise: new Request('https://api.ipify.org').send(),
  };
};

export const setLocation = (coords) => {
  return {
    type: SET_LOCATION,
    payload: coords
  };
};

export const isLoaded = (state) => {
  return state.geolocation.loaded;
};

const getLocation = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition((data) => resolve(data));
  });
};

const updateGeolocation = (result) => {
  console.log(result);
  const data = {
    coords: {
      lat: result.coords.latitude,
      lng: result.coords.longitude,
    },
  };
  return new Request('/api/locations', 'POST', data).send();
};

export const updateLocation = ({ dispatch }) => {
  return getLocation()
    .then(updateGeolocation)
    .then((res) => {
      return new Promise((resolve, reject) => {
        debugger;
        res.json().then((data) => {
          if (res.status >= 400) {
            return Promise.reject(data);
          } else {
            return Promise.resolve(data);
          }
        });
      });
    })
    .then(coords => dispatch(setLocation(coords)))
    .catch(err => console.log(err));
};
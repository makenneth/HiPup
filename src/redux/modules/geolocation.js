import { fromJS } from 'immutable';
import { LOAD_AUTH_SUCCESS } from './auth';
import { Request } from 'helpers';

const FETCHING_LOCATION = 'hp/location/FETCHING_LOCATION';
const FETCHED_LOCATION_WITH_IP = 'hp/location/FETCHED_LOCATION_WITH_IP';
const FETCHED_LOCATION = 'hp/location/FETCHED_LOCATION';
const SET_LOCATION = 'hp/location/SET_LOCATION';
const SET_CITY_NAME = 'hp/location/SET_CITY_NAME';
const FETCHED_FAILED = 'hp/location/FETCHED_FAILED';

const intialState = fromJS({
  loading: false,
  loaded: false,
  accurate: false,
  location: {
    place: {
      city: null,
      state: null,
    },
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
        return state.set('location', fromJS({
          coords: {
            lat: action.payload.lat,
            lng: action.payload.lng,
          },
          state: {
            city: action.payload.city,
            state: action.payload.state,
          },
        }));
      }

      return state;
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
    case FETCHED_LOCATION_WITH_IP:
      return state.merge({
        loaded: true,
        location: {
          coords: {
            lat: action.payload.lat,
            lng: action.payload.lon,
          },
          place: {
            city: action.payload.city,
            state: action.payload.region,
          },
        },
      });
    case FETCHED_FAILED:
      return state.merge({
        loaded: true,
        error: action.payload
      });
    case SET_CITY_NAME: {
      let city = null;
      let stateName = null;
      Array.isArray(action.payload.results) &&
        action.payload.results[0].address_components.forEach((data) => {
          if (data.types[0] === 'locality') {
            city = data.long_name;
          } else if (data.types[0] === 'administrative_area_level_1') {
            stateName = data.short_name;
          }
        });
      return state.mergeDeep({
        location: {
          place: {
            city: city,
            state: stateName,
          }
        }
      });
    }
    default:
      return state;
  }
};

const loadLocationWithIp = (ip) => {
  return {
    types: [FETCHING_LOCATION, FETCHED_LOCATION_WITH_IP, FETCHED_FAILED],
    promise: new Request(`http://ip-api.com/json/${ip}`).send(),
  };
};

const getIp = () => {
  return new Request('https://api.ipify.org?format=json').send();
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
    navigator.geolocation.getCurrentPosition(data => resolve(data));
  });
};

const updateGeolocation = (coords) => {
  const data = {
    coords: {
      lat: coords.latitude,
      lng: coords.longitude,
    },
  };
  return new Request('/api/locations', 'POST', data).send();
};

export const updateLocation = ({ dispatch }) => {
  return getLocation()
    .then(
      ({ coords }) => {
        dispatch(getCityName(coords));
        dispatch(setLocation(coords));
        return updateGeolocation(coords);
      },
      (failure) => {
        if (failure.message.indexOf('Only secure origins are allowed') == 0) {
          getIp()
            .then(res => res.json())
            .then(data => dispatch(loadLocationWithIp(data.ip)))
        }
      }
    );
};

export const getCityName = ({ latitude, longitude }) => {
  return {
    types: ['NOT USED', SET_CITY_NAME, 'NOT USED'],
    promise: new Request(`http://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&sensor=true`).send(),
  };
};

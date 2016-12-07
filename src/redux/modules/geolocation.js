const FETCHING_LOCATION = "hp/location/FETCHING_LOCATION";
const FETCHED_LOCATION = "hp/location/FETCHED_LOCATION";
const FETCHED_FAILED = "hp/location/FETCHED_FAILED";

const intialState = {
  loading: false,
  loaded: false,
  location: {},
  error: null
};

export default (state = {}, action) => {
  switch (action.type) {
    case FETCHING_LOCATION:
      return {
        loading: true
      };
    case FETCHED_LOCATION:
      return {
        loaded: true,
        location: action.payload
      };
    case FETCHED_FAILED:
      return {
        loaded: true,
        error: action.payload
      };
    default:
      return state;
  }
};
export const loadLocation = () => {
  return {
    types: [FETCHING_LOCATION, FETCHED_LOCATION, FETCHED_FAILED],
    promise: axios.get("https://api.ipify.org")
  };
};

export const isLoaded = (state) => {
  return state.location.loaded;
};
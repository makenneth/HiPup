const FETCHING_LOCATION = "hp/location/FETCHING_LOCATION";
const FETCHED_LOCATION = "hp/location/FETCHED_LOCATION";
const FETCHED_FAILED = "hp/location/FETCHED_FAILED";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCHING_LOCATION:
      return state;
    case FETCHED_LOCATION:
      return state;
    case FETCHED_FAILED:
      return state;
    default:
      return state;
  }
};
export const fetchLocation = () => {
  return {
    types: [FETCHING_LOCATION, FETCHED_LOCATION, FETCHED_FAILED],
    promise: axios.get("https://api.ipify.org")
  };
};
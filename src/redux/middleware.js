export default ({ dispatch, getState }) => next => action => {
  if (typeof action === "function") {
    return action(dispatch, getState);
  }

  const { promise, types, ...rest } = action;
  if (!promise) {
    return next(action);
  }

  const [REQUEST, SUCCESS, FAILURE] = types;
  next({ ...rest, type: REQUEST });
  promise.then((res) => {
    return res.json().then((data) => {
      if (res.status >= 400) {
        return Promise.reject(data);
      } else {
        return Promise.resolve(data);
      }
    });
  }).then((payload) => {
    next({ ...rest, payload: payload, type: SUCCESS });
  }, (error) => {
    console.log(error);
    if (Array.isArray(error)) {
      next({ ...rest, payload: error[0], type: FAILURE });
    } else {
      // console.log(error);
      next({ ...rest, payload: "Something went wrong...", type: FAILURE });
    }
  }).catch((error) => {
    console.log(error);
    if (Array.isArray(error)) {
      next({ ...rest, payload: error[0], type: FAILURE });
    } else {
      next({ ...rest, payload: "Something went wrong...", type: FAILURE });
    }
  });

  return promise;
};

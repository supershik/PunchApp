import { combineReducers } from "redux";

import { authReducer } from "../reducers/auth";
import { configReducer } from "../reducers/config";

export default combineReducers({
  auth: authReducer,
  config: configReducer,
});

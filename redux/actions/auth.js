import { UPDATE_USER } from "./types";
// import axios from "axios";
// import Snackbar from "react-native-snackbar";
// import { BASE_URL } from "../base_url";

export const AUTH_LOADING = "auth_loading";
export const AUTH_FAILDED = "auth_failed";

export const updateUserData = (userdata) => ({
  type: UPDATE_USER,
  payload: userdata,
});

import { 
  CHANGE_THEME, CHANGE_LANGUAGE, UPDATE_EVENT_DATA, 
  UPDATE_LOCATION, UPDATE_ALL_NOTIFICATION, UPDATE_NOTIFICATION,
  UPDATE_SEND_NOTIFICATION, UPDATE_GROUP_MESSAGE, UPDATE_ONE_GROUP_MESSAGE,
} from "./types";

export const CONFIG_LOADING = "config_loading";
export const CONFIG_FAILED = "config_failed";

export const changeTheme = (theme) => ({
  type: CHANGE_THEME,
  payload: theme,
});

export const changeLanguage = (theme) => ({
  type: CHANGE_LANGUAGE,
  payload: theme,
});

export const updateLocation = (locationData) => {
  return {
    type: UPDATE_LOCATION,
    payload: locationData,
  }
};

export const updateEventData = (eventData) => {
  return {
    type: UPDATE_EVENT_DATA,
    payload: eventData,
  }
};

export const addNotification = (notifyData) => {
  return {
  type: ADD_NOTIFICATION,
  payload: notifyData,
}};

export const initNotification = () => {
  return {
    type: INIT_NOTIFICATION,
    payload: [],
  }
};

export const updateNotification = (notifyData) => {
  return {
    type: UPDATE_NOTIFICATION,
    payload: notifyData,
  }
};

export const updateAllNotification = (notifyDataList) => {
  return {
    type: UPDATE_ALL_NOTIFICATION,
    payload: notifyDataList,
  }
};

export const updateMySenderNotification = (notifyDataList) => {
  return {
    type: UPDATE_SEND_NOTIFICATION,
    payload: notifyDataList,
  }
};

export const updateGroupMessage = (notifyDataList) => {
  return {
    type: UPDATE_GROUP_MESSAGE,
    payload: notifyDataList,
  }
};

export const updateOneGroupMessage = (notifyDataList) => {
  return {
    type: UPDATE_ONE_GROUP_MESSAGE,
    payload: notifyDataList,
  }
};

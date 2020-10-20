import {
  CHANGE_THEME, CHANGE_LANGUAGE, UPDATE_EVENT_DATA, UPDATE_LOCATION, 
  ADD_NOTIFICATION, INIT_NOTIFICATION, UPDATE_NOTIFICATION, UPDATE_ALL_NOTIFICATION,
  UPDATE_SEND_NOTIFICATION, UPDATE_GROUP_MESSAGE, UPDATE_ONE_GROUP_MESSAGE
}
from "../actions/types";
import { CONFIG_FAILED, CONFIG_LOADING } from "../actions/config";

const intialState = {
  theme: "default",
  language: "en",
  eventData: [],
  location: null,
  isLoading: false,
  isSuccess: false,
  errorMsg: "",
  notifyData: [],
  notifySendData: [],
  notifyGroupData: [],
  isReadNotify: true,
};

export const configReducer = (state = intialState, { type, payload }) => {
  let newNotifyData = JSON.parse(JSON.stringify(state.notifyData));
  // let newNotifyData = JSON.stringify(state.notifyData);
  switch (type) {
    case CONFIG_LOADING:
      return {
        ...state,
        isLoading: true,
        isSuccess: false,
        isLoggedIn: false,
        errorMsg: "",
      };
    case CONFIG_FAILED:
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        errorMsg: payload,
      };
    case CHANGE_LANGUAGE:
      return {
        ...state,
        language: payload,
        isLoading: false,
        isSuccess: false,
        errorMsg: payload,
      };
    case CHANGE_THEME:
      return {
        ...state,
        theme: payload,
        isLoading: false,
        isSuccess: true,
        errorMsg: "",
      };
    case UPDATE_EVENT_DATA:
        return {
          ...state,
          eventData: payload,
          isLoading: false,
          isSuccess: true,
          errorMsg: "",
        };
    case UPDATE_LOCATION:
      return {
        ...state,
        location: payload,
        isLoading: false,
        isSuccess: true,
        errorMsg: "",
      };
    case ADD_NOTIFICATION:
      newNotifyData.push(payload);
      return {
        ...state,
        notifyData: newNotifyData,
        // isReadNotify: false,
        isLoading: false,
        isSuccess: true,
        errorMsg: "",
      };
    case INIT_NOTIFICATION:
        return {
          ...state,
          notifyData: [],
          // isReadNotify: true,
          isLoading: false,
          isSuccess: true,
          errorMsg: "",
        };
    case UPDATE_NOTIFICATION:
      let isReadNotify = payload.check;
      newNotifyData.forEach((item, index) =>{
        if (item.id == payload.id) {
          newNotifyData[index] = payload
        }
        else {
          if(item.check == false)
            isReadNotify = false
        }
      })

      return {
        ...state,
        notifyData: newNotifyData,
        // isReadNotify: isReadNotify,
        isLoading: false,
        isSuccess: true,
        errorMsg: "",
      };
    case UPDATE_ALL_NOTIFICATION:
        let isReadNotify1 = true;
        payload.forEach((item, index) =>{
          if(item.check == false)
            isReadNotify1 = false
        })
        return {
          ...state,
          notifyData: payload,
          // isReadNotify: isReadNotify1,
          isLoading: false,
          isSuccess: true,
          errorMsg: "",
        };
    case UPDATE_SEND_NOTIFICATION:
      return {
        ...state,
        notifySendData: payload,
        isLoading: false,
        isSuccess: true,
        errorMsg: "",
      };
    case UPDATE_GROUP_MESSAGE:
      let isReadNotify2 = true;
        payload.forEach((item, index) =>{
          if(item.check == false)
            isReadNotify2 = false
        })
      return {
        ...state,
        notifyGroupData: payload,
        isReadNotify: isReadNotify2,
        isLoading: false,
        isSuccess: true,
        errorMsg: "",
      };
    case UPDATE_ONE_GROUP_MESSAGE:
      let newNotifyGroupData = JSON.parse(JSON.stringify(state.notifyGroupData));
      let isReadNotify3 = payload.check;  // one item
      newNotifyGroupData.forEach((item, index) =>{
        if (item.senderid == payload.senderid) {
          newNotifyGroupData[index] = payload
        }
        else {
          if(item.check == false)
            isReadNotify3 = false
        }
      })

      return {
        ...state,
        notifyGroupData: newNotifyGroupData,
        isReadNotify: isReadNotify3,
        isLoading: false,
        isSuccess: true,
        errorMsg: "",
      };
      
    default:
      return state;
  }
};

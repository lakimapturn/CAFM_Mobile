import {
  apiUrls,
  commonErrorMsg,
  messageType,
} from "../../constants/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { axiosPost } from "../../constants/functions";

export const FETCHING = "FETCHING";
export const STOP_FETCHING = "STOP_FETCHING";
export const AUTHENTICATE = "AUTHENTICATE";
export const UPDATE_EMAIL = "UPDATE_EMAIL";
export const UPDATE_MOBILE = "UPDATE_MOBILE";
export const LOGOUT = "LOGOUT";

// Sends request to backend to Authenticate user
export const authenticate = (mobileNum, password) => {
  return async (dispatch) => {
    dispatch({ type: FETCHING });

    const data = { UserName: mobileNum, Password: password };

    try {
      const response = await axiosPost(apiUrls.login, data);
      if (response.data.Message.MessageTypeValue === messageType.success) {
        await AsyncStorage.setItem(
          "user",
          JSON.stringify(response.data.UserDetails)
        );

        return dispatch({
          type: AUTHENTICATE,
          payload: response.data.UserDetails,
        });
      } else throw new Error(JSON.stringify(response.data.Message));
    } catch (error) {
      dispatch({ type: STOP_FETCHING });
      throw error;
    }
  };
};

// Sends registration request to backend
// requires no update to internal state
export const register = async (fname, lname, email, mobile, site, location) => {
  const data = {
    FirstName: fname,
    LastName: lname,
    Email: email,
    Mobile: mobile,
    SiteName: site,
    LocationName: location,
  };

  try {
    const response = await axiosPost(apiUrls.register, data);
    return await response.data.Message;
  } catch (error) {
    return commonErrorMsg;
  }
};

// Requires no update of internal state
export const getLoginKey = (mobile) => {
  return async () => {
    const data = { Mobile: mobile, KeyInEmail: true, KeyInMobile: false };

    try {
      const response = await axiosPost(apiUrls.loginKey, data);
      return response.Message;
    } catch (error) {
      return commonErrorMsg;
    }
  };
};

// Synchronises asyncStorage data with internal state
export const syncUserData = (jsonValue) => {
  return async (dispatch) => {
    dispatch({ type: FETCHING });

    try {
      const user = await JSON.parse(jsonValue);

      dispatch({ type: AUTHENTICATE, payload: user });
    } catch (err) {
      dispatch({ type: STOP_FETCHING });
      return commonErrorMsg;
    }
  };
};

// Sends request to update email with user entered one
export const updateEmail = (email, id) => {
  return async (dispatch) => {
    dispatch({ type: FETCHING });

    const data = { Email: email, ProfileId: id };

    try {
      const response = await axiosPost(apiUrls.updateEmail, data);

      if (response.data.Message.MessageTypeValue === messageType.success)
        return dispatch({
          type: UPDATE_EMAIL,
          payload: response.data.UpdatedEmail,
        });
      else throw new Error(response.data.Message);
    } catch (error) {
      dispatch({ type: STOP_FETCHING });
      throw new Error(error.message);
    }
  };
};

// Sends request to update mobile with user entered one
export const updateMobile = (mobile, id) => {
  return async (dispatch) => {
    dispatch({ type: FETCHING });

    const data = { Mobile: mobile, ProfileId: id };

    try {
      const response = await axiosPost(apiUrls.updateMobile, data);
      if (response.data.Message.MessageTypeValue === messageType.success)
        return dispatch({
          type: UPDATE_MOBILE,
          payload: response.data.UpdatedMobile,
        });
      else throw new Error(response.data.Message.Text);
    } catch (error) {
      dispatch({ type: STOP_FETCHING });
      throw new Error(error.message);
    }
  };
};

// Clears Async Storage and central app state.
export const logout = () => {
  return async (dispatch) => {
    dispatch({ type: FETCHING });

    try {
      AsyncStorage.removeItem("user");

      dispatch({
        type: LOGOUT,
      });
    } catch (err) {
      dispatch({ type: STOP_FETCHING });
      throw new Error("Failed to logout user, try again later");
    }
  };
};

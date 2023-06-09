import axios from "axios";

import {
  baseApiUrl,
  commonErrorMsg,
  messageType,
} from "../../constants/constants";

export const FETCHING = "FETCHING";
export const AUTHENTICATE = "AUTHENTICATE";
export const UPDATE_EMAIL = "UPDATE_EMAIL";
export const UPDATE_MOBILE = "UPDATE_MOBILE";
export const LOGOUT = "LOGOUT";

// Sends request to backend to Authenticate user
export const authenticate = (mobileNum, password) => {
  return async (dispatch) => {
    const data = { UserName: mobileNum, Password: password };

    try {
      const response = await axios.post(baseApiUrl + "Login/GetLogin", data);
      // console.log(response.data);
      if (response.data.Message.Code === messageType.success)
        return dispatch({
          type: AUTHENTICATE,
          payload: response.data.UserDetails,
        });
      else throw new Error(JSON.stringify(response.data.Message));
    } catch (error) {
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
    const response = await axios.post(
      baseApiUrl + "Login/RequestSelfRegistration",
      data
    );
    return response.Message;
  } catch (error) {
    return commonErrorMsg;
  }
};

// Requires no update of internal state
export const getLoginKey = (mobile) => {
  return async (dispatch) => {
    const data = { Mobile: mobile, KeyInEmail: true, KeyInMobile: false };

    try {
      const response = await axios.post(baseApiUrl + "Login/GetLoginKey", data);
      return response.Message;
    } catch (error) {
      return commonErrorMsg;
    }
  };
};

export const updateEmail = (email, id) => {
  return async (dispatch) => {
    const data = {
      Email: email,
      ProfileId: id,
    };

    try {
      const response = await axios.post(
        baseApiUrl + "Common/UpdateEmail",
        data
      );
      if (response.data.Message.Code === 2)
        return dispatch({
          type: UPDATE_EMAIL,
          payload: response.data.UpdatedEmail,
        });
      else throw new Error(response.data.Message);
    } catch (error) {
      throw new Error(error.message);
    }
  };
};

export const updateMobile = (mobile, id) => {
  return async (dispatch) => {
    const data = {
      Mobile: mobile,
      ProfileId: id,
    };

    try {
      const response = await axios.post(
        baseApiUrl + "Common/UpdateMobile",
        data
      );
      if (response.data.Message.Code === 2)
        return dispatch({
          type: UPDATE_MOBILE,
          payload: response.data.UpdatedMobile,
        });
      else throw new Error(response.data.Message.Text);
    } catch (error) {
      throw new Error(error.message);
    }
  };
};

// Clears Async Storage and app state.
export const logout = () => {
  return async (dispatch) => {
    try {
      //   AsyncStorage.removeItem("session");

      dispatch({
        type: LOGOUT,
      });
    } catch (err) {
      throw new Error("Failed to logout user, try again later");
    }
  };
};

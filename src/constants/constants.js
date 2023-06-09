export const colors = {
  green: "#66cc33", // 6c3
  black: "#212529",
  white: "#fff",
  yellow: "#f8cb00",
  red: "#b00020",
  cyan: "#00d1a6",
  blue: "#004cff",
  grey: "#747474",
};

export const statusColors = {
  assigned: colors.blue,
  cancelled: colors.red,
  onHold: colors.yellow,
  closed: colors.grey,
  resolved: colors.green,
  created: colors.cyan,
};

export const screens = {
  login: "Login",
  register: "Register",
  tickets: "Tickets",
  addEditTicket: "Add/Edit Ticket",
  userDetails: "User Details",
};

export const messageType = {
  error: 2,
  warning: 1,
  success: 4,
};

export const initialRegistrationState = {
  fname: "",
  lname: "",
  mobile: "",
  email: "",
  site: "",
  location: "",
  isLoading: false,
  msg: { MessageTypeValue: -1, Text: "" },
  showError: false,
};

// export const initialRegistrationState = {
// fname: "L",
// lname: "M",
// mobile: "0569141325",
// email: "abcd@gmail.com",
// site: "baf",
// location: "801",
// isLoading: false,
// msg: { MessageTypeValue: -1, Text: "" },
// showError: false,
// };

export const registrationActions = {
  showLoading: "SHOW_LOADING",
  hideLoading: "HIDE_LOADING",
  updateFname: "UPDATE_FNAME",
  updateLname: "UPDATE_LNAME",
  updateMobile: "UPDATE_MOBILE",
  updateEmail: "UPDATE_EMAIL",
  updateSite: "UPDATE_SITE",
  updateLocation: "UPDATE_LOCATION",
  showMsg: "SHOW_MESSAGE",
  hideMsg: "HIDE_MESSAGE",
  reset: "RESET",
};

export const parameterType = {
  periodType: 63,
  ticketStatus: 5,
};

export const commonErrorMsg = "Something went wrong! Try again later.";
export const automaticLoginError =
  "Something went wrong while logging you in. Please enter your login details again.";

export const mobileNumPatter =
  /^(?:\+971|00971|0)?(?:50|51|52|54|55|56|58|2|3|4|6|7|9)\d{7}$/i;

export const baseApiUrl = "http://cafmdemo.emqube.com:81/api/api/";

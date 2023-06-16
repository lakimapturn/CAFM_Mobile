// App theme colors
export const colors = {
  green: "#66cc33",
  black: "#212529",
  white: "#fff",
  yellow: "#ffc107",
  red: "#b00020",
  cyan: "#00d1a6",
  blue: "#004cff",
  grey: "#747474",
};

// Response status: Color codes and ids
export const statusColors = {
  assigned: colors.blue,
  cancelled: colors.red,
  onHold: colors.yellow,
  closed: colors.grey,
  resolved: colors.green,
  created: colors.cyan,
};
export const statusColorIds = {
  1: statusColors.created,
  2: statusColors.assigned,
  3: statusColors.resolved,
  4: statusColors.onHold,
  7: statusColors.closed,
  8: statusColors.cancelled,
};

// Response Message Types
export const messageType = {
  error: 2,
  warning: 1,
  success: 4,
};

// Object containing all screens of the app
export const screens = {
  login: "Login",
  register: "Register",
  home: "Home",
  addEditTicket: "Add/Edit Ticket",
  userDetails: "User Details",
  editUserDetails: "Edit User Details",
};

// Registration page: initial state object and actions object
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

// Add/Edit Ticket page: initial state object and actions object
export const initialTicketState = {
  issueDetails: "",
  visitTime: "",
  files: [],
  issuesVisible: false,
  issue: 0,
  msg: "",
  showMsg: false,
};

export const ticketActions = {
  updateIssueDetails: "UPDATE_ISSUE_DETAILS",
  updateVisitTime: "UPDATE_VISIT_TIME",
  chooseFile: "CHOOSE_FILE",
  setIssuesVisible: "SET_ISSUES_VISIBLE",
  chooseIssue: "CHOOSE_ISSUE",
  showMsg: "SHOW_MESSAGE",
  hideMsg: "HIDE_MESSAGE",
};

// Home page: initial state object and actions object
export const initialTicketFilterState = {
  PageIndex: 0,
  PageSize: 25,
  StatusIds: "1,2,3,4,5,6,7,8",
  DatePeriod: 0,
  showFilters: false,
  animationLoading: false,
};

export const filterActions = {
  updateDateAndStatus: "UPDATE_DATE_AND_STATUS",
  nextPage: "NEXT_PAGE",
  prevPage: "PREV_PAGE",
  closeFilters: "CLOSE_FILTERS",
  openFilters: "OPEN_FILTERS",
  reset: "RESET",
  showAnimationLoading: "SHOW_ANIMATION_LOADING",
};

export const userDetailOptions = {
  email: "EMAIL",
  mobile: "MOBILE",
};

export const parameterType = {
  periodType: 63,
  ticketStatus: 5,
};

// Error messages
export const commonErrorMsg = "Something went wrong! Try again later.";
export const formatErrorMsg = {
  email: "Please enter a valid email address",
  mobile: "Please enter a valid mobile number",
};
export const automaticLoginError =
  "Something went wrong while logging you in. Please enter your login details again.";

// Regex Patterns
export const mobileNumPattern =
  /^(?:\+971|00971|0)?(?:50|51|52|54|55|56|58|2|3|4|6|7|9)\d{7}$/i;
export const emailPattern =
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

// API URLS
export const baseApiUrl = "http://cafmdemo.emqube.com:81/api/api/";
export const apiUrls = {
  login: "Login/GetLogin",
  register: "Login/RequestSelfRegistration",
  loginKey: "Login/GetLoginKey",
  updateEmail: "Common/UpdateEmail",
  updateMobile: "Common/UpdateMobile",
  getTickets: "Ticket/GetTicketList",
  addEditTicket: "Ticket/AddUpdateTicket",
  addFiles: "Common/UploadDocs",
  getIssues: "Common/GetIssueList",
  getParameters: "Common/GetParameter",
};

// Default file description to send to backend
export const defaultFileDescription =
  "Added during ticket creation by self service user.";

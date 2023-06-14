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

export const statusColorIds = {
  1: statusColors.created,
  2: statusColors.assigned,
  3: statusColors.resolved,
  4: statusColors.onHold,
  8: statusColors.cancelled,
  7: statusColors.closed,
};

export const screens = {
  login: "Login",
  register: "Register",
  home: "Home",
  addEditTicket: "Add/Edit Ticket",
  userDetails: "User Details",
  editUserDetails: "Edit User Details",
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

export const initialTicketFilterState = {
  FromDate: "",
  ToDate: "",
  PageIndex: 0,
  PageSize: 25,
  SearchKey: "",
  SiteIds: "",
  LocationIds: "",
  StatusIds: "1,2,3,4,5,6,7,8",
  SortBy: "TicketDate",
  SortOrder: -1,
  TicketId: 0,
  LoggedUserId: 1171,
  LicenseeId: 1,
  showFilters: false,
  animationLoading: false,
};

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

export const filterActions = {
  updateDate: "UPDATE_DATE",
  nextPage: "NEXT_PAGE",
  prevPage: "PREV_PAGE",
  setStatusId: "SET_STATUS_ID",
  toggleFilters: "TOGGLE_FILTERS",
  reset: "RESET",
  showAnimationLoading: "SHOW_ANIMATION_LOADING",
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

export const userDetailOptions = {
  email: "EMAIL",
  mobile: "MOBILE",
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

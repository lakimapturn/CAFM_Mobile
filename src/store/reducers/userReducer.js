import {
  AUTHENTICATE,
  FETCHING,
  LOGOUT,
  STOP_FETCHING,
  UPDATE_EMAIL,
  UPDATE_MOBILE,
} from "../actions/userActions";

const initialState = {
  isFetching: false,
  UserName: "",
  Password: "",
  ProfileId: 0,
  FirstName: "",
  LastName: "",
  IsActive: false,
  Email: "",
  Mobile: "",
  SiteId: 0,
  SiteName: "",
  LocationId: 0,
  LocationName: "",
  SiteIds: "",
  HasLoginAccess: false,
  LicenseeId: 1,
  LicenseValidDate: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING: {
      return Object.assign({}, state, {
        ...state,
        isFetching: true,
      });
    }

    case STOP_FETCHING: {
      return Object.assign({}, state, {
        ...state,
        isFetching: false,
      });
    }

    case AUTHENTICATE: {
      return Object.assign({}, state, {
        ...state,
        isFetching: false,
        ...action.payload,
      });
    }

    case UPDATE_EMAIL: {
      return Object.assign({}, state, {
        ...state,
        isFetching: false,
        Email: action.payload,
      });
    }

    case UPDATE_MOBILE: {
      return Object.assign({}, state, {
        ...state,
        isFetching: false,
        Mobile: action.payload,
      });
    }

    case LOGOUT: {
      return Object.assign({}, state, {
        ...initialState,
      });
    }

    default: {
      return state;
    }
  }
};

export default userReducer;

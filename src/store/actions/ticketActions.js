import axios from "axios";
import {
  baseApiUrl,
  commonErrorMsg,
  parameterType,
} from "../../constants/constants";

export const FETCHING = "FETCHING";
export const ADD_TICKET = "ADD_TICKET";
export const GET_TICKETS = "GET_TICKETS";
export const EDIT_TICKET = "EDIT_TICKET";
export const GET_ISSUE_LIST = "GET_ISSUE_LIST";
export const GET_PARAMETERS = "GET_PARAMETERS";

// Fetching tickets from backend
export const getTickets = (
  fromDate,
  toDate,
  pgIndex,
  pgSize,
  searchKey,
  siteIds,
  locationIds,
  statusIds,
  sortBy,
  sortOrder,
  TicketId,
  LoggedUserId,
  LicenseeId
) => {
  return async (dispatch) => {
    const data = {
      FromDate: fromDate,
      ToDate: toDate,
      PageIndex: pgIndex,
      PageSize: pgSize,
      SearchKey: searchKey,
      SiteIds: siteIds,
      LocationIds: locationIds,
      StatusIds: statusIds,
      SortBy: sortBy,
      SortOrder: sortOrder,
      TicketId,
      LoggedUserId,
      LicenseeId,
    };

    try {
      const response = await axios.post(
        baseApiUrl + "Ticket/GetTicketList",
        data
      );

      return dispatch({ type: GET_TICKETS, tickets: response.data.TicketList });
    } catch (error) {
      console.log(error);
      throw new Error(commonErrorMsg);
    }
  };
};

// Adding or editing ticket to backend
export const addEditTicket = (ticket) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        baseApiUrl + "Ticket/AddUpdateTicket",
        ticket
      );
      if (ticket.id === 0)
        dispatch({ type: ADD_TICKET, ticket: response.ticket });
      else dispatch({ type: EDIT_TICKET, ticket: response.ticket });
    } catch (error) {
      console.log(error);
      throw new Error(commonErrorMsg);
    }
  };
};

// Fetching issue list for dropdown menu
export const getIssueList = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(baseApiUrl + "Common/GetIssueList");
      dispatch({ type: GET_ISSUE_LIST, payload: response.data });
    } catch (error) {
      console.log(error);
      throw new Error(commonErrorMsg);
    }
  };
};

// Retrieving parameters for ticket filters
export const getParameters = () => {
  return async (dispatch) => {
    try {
      const data = {
        ParameterTypeIds: `${parameterType.periodType},${parameterType.ticketStatus}`,
      };
      const response = await axios.post(
        baseApiUrl + "Common/GetParameter",
        data
      );
      dispatch({ type: GET_PARAMETERS, payload: response.data });
    } catch (error) {
      console.log(error);
      throw new Error(commonErrorMsg);
    }
  };
};

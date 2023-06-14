import axios from "axios";
import {
  baseApiUrl,
  commonErrorMsg,
  parameterType,
} from "../../constants/constants";

export const FETCHING = "FETCHING";
export const STOP_FETCHING = "STOP_FETCHING";
export const ADD_TICKET = "ADD_TICKET";
export const GET_TICKETS = "GET_TICKETS";
export const EDIT_TICKET = "EDIT_TICKET";
export const GET_ISSUE_LIST = "GET_ISSUE_LIST";
export const GET_PARAMETERS = "GET_PARAMETERS";

// Fetching tickets from backend
export const getTickets = (filters) => {
  return async (dispatch) => {
    dispatch({ type: FETCHING });
    try {
      const response = await axios.post(
        baseApiUrl + "Ticket/GetTicketList",
        filters
      );

      return dispatch({
        type: GET_TICKETS,
        payload: {
          tickets: response.data.TicketList,
          totalTickets: response.data.TotalCount,
        },
      });
    } catch (error) {
      console.log(error);
      throw new Error(commonErrorMsg);
    }
  };
};

// Adding or editing ticket to backend
export const addEditTicket = (ticket) => {
  return async (dispatch) => {
    dispatch({ type: FETCHING });

    try {
      const response = await axios.post(
        baseApiUrl + "Ticket/AddUpdateTicket",
        ticket
      );

      const type = ticket.id === 0 ? ADD_TICKET : EDIT_TICKET;
      // return dispatch({ type: type, payload: response.data.ReturnTicketId });
      return dispatch({ type: STOP_FETCHING });
    } catch (error) {
      console.log(error);
      throw new Error(commonErrorMsg);
    }
  };
};

// Fetching issue list for dropdown menu
export const getIssueList = () => {
  return async (dispatch) => {
    dispatch({ type: FETCHING });

    try {
      const response = await axios.post(baseApiUrl + "Common/GetIssueList", {});
      return await dispatch({ type: GET_ISSUE_LIST, payload: response.data });
    } catch (error) {
      console.log(error);
      throw new Error(commonErrorMsg);
    }
  };
};

// Retrieving parameters for ticket filters
export const getParameters = () => {
  return async (dispatch) => {
    dispatch({ type: FETCHING });

    try {
      const data = {
        ParameterTypeIds: `${parameterType.periodType},${parameterType.ticketStatus}`,
      };
      const response = await axios.post(
        baseApiUrl + "Common/GetParameter",
        data
      );
      return dispatch({
        type: GET_PARAMETERS,
        payload: response.data.ParameterList,
      });
    } catch (error) {
      console.log(error);
      throw new Error(commonErrorMsg);
    }
  };
};
import {
  apiUrls,
  commonErrorMsg,
  defaultFileDescription,
  parameterType,
} from "../../constants/constants";
import { axiosPost } from "../../constants/functions";

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
      const response = await axiosPost(apiUrls.getTickets, filters);

      return dispatch({
        type: GET_TICKETS,
        payload: {
          tickets: response.data.TicketList,
          totalTickets: response.data.TotalCount,
        },
      });
    } catch (error) {
      dispatch({ type: STOP_FETCHING });
      throw new Error(commonErrorMsg);
    }
  };
};

// Adding or editing ticket to backend
export const addEditTicket = (ticket, files) => {
  return async (dispatch) => {
    dispatch({ type: FETCHING });

    try {
      const response = await axiosPost(apiUrls.addEditTicket, ticket);

      const type = ticket.id === 0 ? ADD_TICKET : EDIT_TICKET;

      return dispatch(addFiles(response.data.ReturnTicketId, files));
    } catch (error) {
      dispatch({ type: STOP_FETCHING });
      throw new Error(commonErrorMsg);
    }
  };
};

// Adds files to the backend
export const addFiles = (userId, ticketId, files) => {
  return async (dispatch) => {
    try {
      const data = {
        FileTypeValue: 10,
        CreatedBy: userId,
        DocRefId: ticketId,
        Description: defaultFileDescription,
        File: files,
        LicenseeId: 1,
      };

      const response = await axiosPost(apiUrls.addFiles, data);

      return dispatch({ type: STOP_FETCHING });
    } catch (error) {
      dispatch({ type: STOP_FETCHING });
      throw new Error(commonErrorMsg);
    }
  };
};

// Fetching issue list for dropdown menu
export const getIssueList = () => {
  return async (dispatch) => {
    dispatch({ type: FETCHING });

    try {
      const response = await axiosPost(apiUrls.getIssues, {});
      return await dispatch({ type: GET_ISSUE_LIST, payload: response.data });
    } catch (error) {
      dispatch({ type: STOP_FETCHING });
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
      const response = await axiosPost(apiUrls.getParameters, data);
      return dispatch({
        type: GET_PARAMETERS,
        payload: response.data.ParameterList,
      });
    } catch (error) {
      dispatch({ type: STOP_FETCHING });
      throw new Error(commonErrorMsg);
    }
  };
};

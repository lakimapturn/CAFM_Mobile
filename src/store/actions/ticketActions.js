import * as FileSystem from "expo-file-system";

import {
  apiUrls,
  commonErrorMsg,
  defaultFileDescription,
  messageType,
  parameterType,
} from "../../constants/constants";
import { axiosPost, uploadFiles } from "../../constants/functions";

export const FETCHING = "TICKET_FETCHING";
export const STOP_FETCHING = "STOP_FETCHING";
export const ADD_TICKET = "ADD_TICKET";
export const GET_TICKETS = "GET_TICKETS";
export const EDIT_TICKET = "EDIT_TICKET";
export const GET_ISSUE_LIST = "GET_ISSUE_LIST";
export const GET_PARAMETERS = "GET_PARAMETERS";
export const GET_TICKET_DOCS = "GET_TICKET_DOCS";
export const CLEAR_TICKET_DOCS = "CLEAR_TICKET_DOCS";

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
export const addEditTicket = (
  data,
  files = undefined,
  deletedFiles = undefined
) => {
  return async (dispatch) => {
    dispatch({ type: FETCHING });

    try {
      const type = data.id === 0 ? ADD_TICKET : EDIT_TICKET;

      const response = await axiosPost(apiUrls.addEditTicket, data);

      if (deletedFiles)
        for (const i in deletedFiles) {
          const file = deletedFiles[i];

          if (file.DocID)
            await deleteFiles(file.DocID, response.data.ReturnTicketId);
        }

      if (files.length > 0)
        await addFiles(data.LoggedInUser, response.data.ReturnTicketId, files);

      return dispatch({ type: STOP_FETCHING });
    } catch (error) {
      dispatch({ type: STOP_FETCHING });
      throw new Error(commonErrorMsg);
    }
  };
};

// Adds files to the backend
export const addFiles = async (userId, ticketId, files) => {
  try {
    const formData = new FormData();

    formData.append("DocRefId", ticketId);
    formData.append("CreatedBy", userId);
    formData.append("FileTypeValue", 10);
    formData.append("Description", defaultFileDescription);

    const data = {
      FileTypeValue: 10,
      CreatedBy: userId,
      DocRefId: ticketId,
      Description: defaultFileDescription,
      File: files,
      LicenseeId: 1,
    };

    files.forEach((file) => {
      if (!file.DocID) {
        const blob = fetch(file.uri)
          .then((res) => res.blob())
          .then((b) => b)
          .catch((err) => console.log(err.message));

        const f = new File([blob], file.name, {
          type: file.type,
        });
        console.log(blob);
        console.log(f);

        formData.append("file", f);
      }
    });

    formData.append("LicenseeId", 1);

    const response = await axiosPost(apiUrls.addTicketDocuments, formData, {
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
    });

    if (response.data.Message.MessageTypeValue !== messageType.success) {
      console.log(response.data.Message);
      throw new Error(response.data.Message);
    }
  } catch (error) {
    throw new Error(commonErrorMsg);
  }
};

// Deletes a file from the backend
export const deleteFiles = async (docId, ticketId) => {
  const data = { DocId: docId, TicketId: ticketId };
  try {
    const response = await axiosPost(apiUrls.deleteTicketDocuments, data);

    if (response.data.Message.MessageTypeValue !== messageType.success)
      throw new Error();
  } catch (error) {
    throw new Error(commonErrorMsg);
  }
};

export const getTicketDocuments = (ticketId) => {
  return async (dispatch) => {
    dispatch({ type: FETCHING });

    try {
      const data = { TicketId: ticketId };

      const response = await axiosPost(apiUrls.getTicketDocuments, data);
      return await dispatch({ type: GET_TICKET_DOCS, payload: response.data });
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
    dispatch({ type: CLEAR_TICKET_DOCS });

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

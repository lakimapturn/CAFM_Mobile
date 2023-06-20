import axios from "axios";
import { baseApiUrl, emailPattern, mobileNumPattern } from "./constants";

export const checkNum = (number) => {};

// formats the data so that it can be used by the DropDown library components
export const getDropdownData = (data, key, value) => {
  if (!data) return [];

  const dData = data.map((item) => ({
    key: item[key],
    value: item[value],
  }));
  return dData;
};

// Removes the Good Time to Visit String and returns only the remark
export const formatVisitTime = (visitTime) => {
  if (visitTime) return visitTime.substring(visitTime.indexOf(":") + 1).trim();
  return "";
};

// Returns the previously selected dropdown option for ticket editting
export const getDefaultDropdownOption = (ticket = undefined) => {
  if (ticket) return { key: ticket.IssueId, value: ticket.IssueName };
  return {};
};

// sends a post request using the specific api endpoint and data
export const axiosPost = async (url, data, headers = undefined) => {
  if (headers) return await axios.post(baseApiUrl + url, { ...data, headers });
  return await axios.post(baseApiUrl + url, data);
};

// checks if the entered mobile number matches the regex pattern
export const testMobileFormat = (mobile) => {
  return mobileNumPattern.test(mobile);
};

// checks if the entered email address matches the regex pattern
export const testEmailFormat = (email) => {
  return emailPattern.test(email);
};

// creates a message object that is usable by the Message Component
export const createMessageObject = (text, messageType) =>
  JSON.stringify({
    Text: text,
    MessageTypeValue: messageType,
  });

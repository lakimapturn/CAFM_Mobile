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

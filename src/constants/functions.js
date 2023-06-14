export const checkNum = (number) => {};

export const getDropdownData = (data, key, value) => {
  if (!data) return [];

  const dData = data.map((item) => ({
    key: item[key],
    value: item[value],
  }));
  return dData;
};

export const formatVisitTime = (visitTime) => {
  return visitTime.substring(visitTime.indexOf(":") + 1).trim();
};

export const getDefaultDropdownOption = (ticket = undefined) => {
  if (ticket) return { key: ticket.IssueId, value: ticket.IssueName };
  return {};
};

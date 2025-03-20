export const roundNumber = (num) => {
  return Math.round(num * 100) / 100;
};

export const formatDate = (isoString) => {
  return isoString.split("T")[0];
};

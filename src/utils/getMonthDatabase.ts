const months = [
  "jan",
  "feb",
  "mar",
  "abr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec",
];

export const getMonthDatabase = (date?: Date): string => {
  if(date) {
    return `${months[date.getMonth()]}${date.getFullYear()}`;
  } else {
    return `${months[new Date().getMonth()]}${new Date().getFullYear()}`;
  }
};

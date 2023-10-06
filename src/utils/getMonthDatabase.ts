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

export const getMonthDatabase = (): string => {
  return `${months[new Date().getMonth()]}${new Date().getFullYear()}`;
};

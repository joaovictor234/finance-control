export const getDaysInMonth = (year: number, month: number): string[] => {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysArray = Array.from(
    { length: Math.ceil(daysInMonth) },
    (_, index) => {
      if(index % 2 === 0) {
        return ""
      } else return (index + 1).toString();
    }
  );
  return daysArray;
};

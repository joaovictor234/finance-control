export const getDaysOfMonth = () => {
  const year = new Date().getFullYear();
  const month = new Date().getMonth()+1;

  const data = new Date(year, month, 0);
  const numberOfDays = data.getDate();

  const days = [];

  for(let i = 1; i <= numberOfDays; i++) {
    days.push(i);
  }

  return days;
}
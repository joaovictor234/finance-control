import { Item } from "../@types/item";

export const getMonthAmountSpent = (days: number[], items: Item[]): number[] => {
  const monthAmountSpent = [];
  for(let i = 0; i < days.length; i++) {
    let value = 0;
    for(let item of items) {
      const day = item.data.getDate();
      if(day === days[i]) value += item.value;
    }
    monthAmountSpent.push(value);
  }
  console.log(monthAmountSpent)
  return monthAmountSpent;
}
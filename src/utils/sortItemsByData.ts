import { Timestamp } from "firebase/firestore";
import { Item } from "../models/Item";

export const sortItemsByData = (items: Item[]): Item[] => {
  if (items) {
    return items.sort((itemA, itemB) => {
      if (itemA.data instanceof Timestamp && itemB.data instanceof Timestamp) {
        return itemB.data.seconds - itemA.data.seconds;
      } else if (
        itemA.data instanceof Timestamp &&
        itemB.data instanceof Date
      ) {
        return itemB.data.getTime() - itemA.data.seconds;
      } else if (
        itemA.data instanceof Date &&
        itemB.data instanceof Timestamp
      ) {
        return itemB.data.seconds - itemA.data.getTime();
      } else {
        return itemB.data.getTime() - itemA.data.getTime();
      }
    });
  }
  return items;
};

import { Timestamp } from "firebase/firestore";
import { Item } from "../models/Item";

export const sortItemsByData = (items: Item[]): Item[] => {
  if (items) {
    return items.sort((itemA, itemB) => {
      if (itemA.data instanceof Timestamp && itemB.data instanceof Timestamp) {
        return itemA.data.seconds - itemB.data.seconds;
      } else if (
        itemA.data instanceof Timestamp &&
        itemB.data instanceof Date
      ) {
        return itemA.data.seconds - itemB.data.getTime();
      } else if (
        itemA.data instanceof Date &&
        itemB.data instanceof Timestamp
      ) {
        return itemA.data.getTime() - itemB.data.seconds;
      } else {
        return itemA.data.getTime() - itemB.data.getTime();
      }
    });
  }
  return items;
};

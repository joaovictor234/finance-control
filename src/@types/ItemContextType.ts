import { Item } from "../models/Item"

export type ItemContextType = {
  items: Item[];
  addItem: (item: Item) => void;
  addItems: (items: Item[]) => void;
  removeItem: (id: string) => void;
}
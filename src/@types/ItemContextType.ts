import { Category } from "../models/Category";
import { Item } from "../models/Item"

export type ItemContextType = {
  items: Item[];
  addItem: (item: Item) => Category;
  addItems: (items: Item[]) => void;
  removeItem: (id: string) => void;
}
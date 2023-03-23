
import { Dispatch, SetStateAction } from "react";

export interface Item {
  id: string,
  value: number,
  description: string,
  category: string,
  data: Date
}

export type ItemContextType = {
  items: Item[];
  setItems: Dispatch<SetStateAction<Item[]>>;
}
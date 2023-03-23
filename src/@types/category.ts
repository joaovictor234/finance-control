
import { Dispatch, SetStateAction } from "react";

export interface Category {
  id: string,
  name: string,
  percentage: number,
  value: number,
  remainingAmount: number,
  amountSpent: number
}

export type CategoryContextType = {
  category: Category | null;
  setCategory: Dispatch<SetStateAction<Category | null>>
  categories: Category[];
  setCategories: Dispatch<SetStateAction<Category[]>>
}
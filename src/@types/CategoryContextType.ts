import { Category } from "../models/Category";

export type CategoryContextType = {
  categories: Category[];
  colors: string[];
  icons: string[];
  addCategory: (category: Category) => void;
  addCategories: (categories: Category[]) => void;
  removeCategory: (id: string) => void;
  updateCategory: (category: Category) => void;
  calculateTotalValue: () => number;
  calculateTotalPercentage: () => number;
  calculateTotalRemaining: () => number;
};

import { Category } from "../@types/category";

export const isValueGreaterThanCategoriesValues = (value: number, categories: Category[], selectedCategory: string) => {
  let category: Category[] = categories.filter(c => c.name === selectedCategory);
  if(category[0]) {
    if(value > category[0].remainingAmount) return true;
    else return false;
  }
  return false;
}
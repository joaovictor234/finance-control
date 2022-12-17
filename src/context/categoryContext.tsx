import { createContext, useState } from "react";
import { Category, CategoryContextType } from "../@types/category";
import { Props } from "../@types/props";

export const CategoryContext = createContext<CategoryContextType | null>(null);

const CategoryProvider = ({children}: Props) => {
  const [category, setCategory] = useState<Category | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  return (
    <CategoryContext.Provider
      value={{category, setCategory, categories, setCategories}}>
      {children}
    </CategoryContext.Provider>  
  )
}

export default CategoryProvider;
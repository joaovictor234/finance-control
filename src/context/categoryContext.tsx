import { createContext, useContext, useState } from "react";
import { Category, CategoryContextType } from "../@types/category";
import { MoneyContextType } from "../@types/money";
import { Props } from "../@types/props";
import { MoneyContext } from "./moneyContext";

export const CategoryContext = createContext<CategoryContextType | null>(null);

const CategoryProvider = ({children}: Props) => {
  const { money } = useContext(MoneyContext) as MoneyContextType;
  const [category, setCategory] = useState<Category | null>(null);
  const [categories, setCategories] = useState<Category[]>([
    {
      id: '0',
      name: 'Lazer',
      percentage: 19,
      amountSpent: 0,
      remainingAmount: 200,
      value: money * 19 / 100
    },
    {
      id: '1',
      name: 'Passagem',
      percentage: 11,
      amountSpent: 0,
      remainingAmount: 200,
      value: money * 11 / 100
    },
    {
      id: '2',
      name: 'Estudo',
      percentage: 11,
      amountSpent: 0,
      remainingAmount: 200,
      value: money * 11 / 100
    },
    {
      id: '3',
      name: 'Necessidade',
      percentage: 19,
      amountSpent: 0,
      remainingAmount: 200,
      value: money * 19 / 100
    },
    {
      id: '4',
      name: 'Investimento',
      percentage: 40,
      amountSpent: 0,
      remainingAmount: 200,
      value: money * 40 / 100
    }
  ]);

  return (
    <CategoryContext.Provider
      value={{category, setCategory, categories, setCategories}}>
      {children}
    </CategoryContext.Provider>  
  )
}

export default CategoryProvider;
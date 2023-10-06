import { createContext, useState, useContext } from "react";
import { ItemContextType } from "../@types/ItemContextType";
import { Item } from "../models/Item";
import { CategoryContext } from "./CategoryContext";
import { CategoryContextType } from "../@types/CategoryContextType";
import { Category } from "../models/Category";
import { ContextProps } from "../interface/ContextProps";

export const ItemContext = createContext<ItemContextType | null>(null);

const ItemContextProvider = ({ children }: ContextProps) => {
  const [items, setItems] = useState<Item[]>([]);
  const { categories, updateCategory } = useContext(
    CategoryContext
  ) as CategoryContextType;

  const addItem = (newItem: Item) => {
    setItems((currItems) => [newItem, ...currItems]);
    const [category] = categories.filter(
      (category) => category.name === newItem.category
    );
    const updatedCategory: Category = {
      ...category,
      totalRemaining: category.totalRemaining - newItem.value,
    };
    updateCategory(updatedCategory);
  };

  const addItems = (i: Item[]) => {
    setItems(i);
  };

  const removeItem = (id: string) => {
    const filteredItems = items.filter((item) => item.id !== id);
    setItems(filteredItems);
  };

  return (
    <ItemContext.Provider value={{ items, addItem, addItems, removeItem }}>
      {children}
    </ItemContext.Provider>
  );
};

export default ItemContextProvider;

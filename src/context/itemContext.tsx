import { createContext, useState, useContext, useEffect } from "react";
import { ItemContextType } from "../@types/ItemContextType";
import { Item } from "../models/Item";
import { CategoryContext } from "./CategoryContext";
import { CategoryContextType } from "../@types/CategoryContextType";
import { Category } from "../models/Category";
import { ContextProps } from "../interface/ContextProps";
import { sortItemsByData } from "../utils/sortItemsByData";
import { AuthContext } from "./AuthContext";
import { AuthContextType } from "../@types/AuthContextType";

export const ItemContext = createContext<ItemContextType | null>(null);

const ItemContextProvider = ({ children }: ContextProps) => {
  const { userToken } = useContext(AuthContext) as AuthContextType;
  const [items, setItems] = useState<Item[]>([]);
  const { categories, updateCategory } = useContext(
    CategoryContext
  ) as CategoryContextType;

  const addItem = async (newItem: Item): Promise<Category> => {
    setItems((currItems) => [newItem, ...currItems]);
    const [category] = categories.filter(
      (category) => category.name === newItem.category
    );

    const updatedCategory: Category = {
      ...category,
      totalRemaining: category.totalRemaining - newItem.value,
    };

    updateCategory(updatedCategory);
    return updatedCategory;
  };

  const addItems = (i: Item[]) => {
    setItems(sortItemsByData(i));
  };

  const removeItem = (id: string) => {
    const filteredItems = items.filter((item) => item.id !== id);
    setItems(filteredItems);
  };

  useEffect(() => {
    if (!userToken) {
      setItems([]);
    }
  }, [userToken]);

  return (
    <ItemContext.Provider value={{ items, addItem, addItems, removeItem }}>
      {children}
    </ItemContext.Provider>
  );
};

export default ItemContextProvider;

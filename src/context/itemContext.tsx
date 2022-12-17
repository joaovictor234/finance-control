import { createContext, useState } from "react";
import { Item, ItemContextType } from "../@types/item";
import { Props } from "../@types/props";

export const ItemContext = createContext<ItemContextType | null>(null);

const ItemProvider = ({children}: Props) => {
  const [items, setItems] = useState<Item[]>([]);

  return (
    <ItemContext.Provider value={{ items, setItems}}>
      {children}
    </ItemContext.Provider>  
  )
}

export default ItemProvider;
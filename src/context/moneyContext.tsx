import { createContext, useState } from "react";
import { MoneyContextType } from "../@types/money";
import { Props } from "../@types/props";

export const MoneyContext = createContext<MoneyContextType | null>(null);

const MoneyProvider = ({children}: Props) => {
  const [money, setMoney] = useState(0);

  return (
    <MoneyContext.Provider value={{money, setMoney}}>
      {children}
    </MoneyContext.Provider>  
  )
}

export default MoneyProvider;
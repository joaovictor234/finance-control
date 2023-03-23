import { createContext, useState } from "react";
import { MoneyContextType } from "../@types/money";
import { Props } from "../@types/props";

export const MoneyContext = createContext<MoneyContextType | null>(null);

const MoneyProvider = ({children}: Props) => {
  const [money, setMoney] = useState(1000);
  const [remainingAmount, setRemainingAmount] = useState(1000);

  return (
    <MoneyContext.Provider value={{
      money, setMoney,
      remainingAmount, setRemainingAmount
    }}>
      {children}
    </MoneyContext.Provider>  
  )
}

export default MoneyProvider;
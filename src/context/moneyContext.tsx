import { createContext, useContext, useEffect, useState } from "react";
import { MoneyContextType } from "../@types/MoneyContextType";
import { ContextProps } from "../interface/ContextProps";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { FIREBASE_DB } from "../auth/firebaseConfig";
import { AuthContext } from "./AuthContext";
import { AuthContextType } from "../@types/AuthContextType";
import { CategoryContext } from "./CategoryContext";
import { CategoryContextType } from "../@types/CategoryContextType";

export const MoneyContext = createContext<MoneyContextType | null>(null);

const MoneyContextProvider = ({ children }: ContextProps) => {
  const [money, setMoney] = useState(0);
  const { userToken } = useContext(AuthContext) as AuthContextType;

  const addMoney = async (value: number) => {
    if (value) setMoney(value);
  };

  const resetMoney = () => {
    setMoney(0);
  };

  useEffect(() => {
    if (!userToken) resetMoney();
  }, [userToken]);

  return (
    <MoneyContext.Provider value={{ money, addMoney, resetMoney }}>
      {children}
    </MoneyContext.Provider>
  );
};

export default MoneyContextProvider;

import { createContext, useState } from "react";
import { MonthYearContextType } from "../@types/MonthYearContextType";
import { ContextProps } from "../interface/ContextProps";
import { MonthYear } from "../interface/MonthYear";

export const MonthYearContext = createContext<MonthYearContextType | null>(
  null
);

const MonthYearContextProvider = ({ children }: ContextProps) => {
  const [monthYear, setMonthYear] = useState<MonthYear>({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });

  const changeMonthYear = (my: MonthYear) => {
    setMonthYear(my);
  };

  return (
    <MonthYearContext.Provider value={{ monthYear, changeMonthYear }}>
      {children}
    </MonthYearContext.Provider>
  );
};

export default MonthYearContextProvider;
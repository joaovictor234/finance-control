import { MonthYear } from "../interface/MonthYear"

export type MonthYearContextType = {
  monthYear: MonthYear;
  changeMonthYear: (monthYear: MonthYear) => void; 
}
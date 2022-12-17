import { Dispatch, SetStateAction } from "react";

export type MoneyContextType = {
  money: number;
  setMoney: Dispatch<SetStateAction<number>>
}
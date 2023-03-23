import { Dispatch, SetStateAction } from "react";

export type MoneyContextType = {
  money: number;
  remainingAmount: number;
  setMoney: Dispatch<SetStateAction<number>>;
  setRemainingAmount: Dispatch<SetStateAction<number>>;
}
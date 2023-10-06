export type MoneyContextType = {
  money: number,
  addMoney: (value: number) => void;
  resetMoney: () => void;
}
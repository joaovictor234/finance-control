import { useContext } from "react"
import { CategoryContextType } from "../../@types/category"
import { MoneyContextType } from "../../@types/money"
import { CategoryContext } from "../../context/categoryContext"
import { MoneyContext } from "../../context/moneyContext"
import { formatMoneyToBRL } from "../../services/formatMoney"
import './table.css'

export const Table = () => {
  
  const { categories } = useContext(CategoryContext) as CategoryContextType;
  const { money } = useContext(MoneyContext) as MoneyContextType;
  const totalSpent = categories.reduce((p, c) => p + c.amountSpent, 0);
  const totalRemaining = categories.reduce((p, c) => p + c.remainingAmount, 0);
  
  return (
    <div>
      <table>
        <thead>
          <tr>
            <td>Category</td>
            <td>%</td>
            <td>Value</td>
            <td>Amount Spent</td>
            <td>Remaining Amount</td>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => 
            <tr className="table--values" key={index}>
              <td>{category.name}</td>
              <td>{category.percentage}</td>
              <td>{formatMoneyToBRL(category.value)}</td>
              <td>{formatMoneyToBRL(category.amountSpent)}</td>
              <td>{formatMoneyToBRL(category.remainingAmount)}</td>
            </tr>
          )}
          <tr className="table--values">
            <td>Total</td>
            <td>100</td>
            <td>{formatMoneyToBRL(money)}</td>
            <td>{formatMoneyToBRL(totalSpent)}</td>
            <td>{formatMoneyToBRL(totalRemaining)}</td>
          </tr>
        </tbody>
      </table>
    </div>  
  )
}
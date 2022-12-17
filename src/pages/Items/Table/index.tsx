import { useContext } from "react"
import { CategoryContextType } from "../../../@types/category"
import { CategoryContext } from "../../../context/categoryContext";
import { formatMoneyToBRL } from "../../../services/formatMoney";
import '../../Table/table.css';

export const ItemsTable = () => {
  const { categories } = useContext(CategoryContext) as CategoryContextType;
  
  return (
    <table>
      <thead>
        <tr>
          <td>Categories</td>
          <td>Amount Spen</td>
          <td>Remaining Amount</td>
        </tr>
      </thead>
      <tbody>
        {
          categories.map((category, index) => 
            <tr key={index} className="table--values"> 
              <td>{category.name}</td>
              <td>{formatMoneyToBRL(category.amountSpent)}</td>
              <td>{formatMoneyToBRL(category.remainingAmount)}</td>
            </tr>  
          )
        }
      </tbody>
    </table>  
  )
}
import { useContext } from "react"
import { ItemContextType } from "../../../@types/item"
import { ItemContext } from "../../../context/itemContext"
import { Item } from "./Item"
import './list-items.css'

export const ListItems = () => {
  const { items } = useContext(ItemContext) as ItemContextType;

  return (
    <div>
      <div className="items--filter__container">
        <p>order by </p>
        <i className="fa-solid fa-filter"></i>
      </div>
      {
        items.map(item => 
          <Item 
            key={item.id}
            value={item.value}
            category={item.category}
            description={item.description}
            data={item.data}
          />  
        )
      }
    </div>
  )
}
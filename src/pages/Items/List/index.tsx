import { Dispatch, SetStateAction, useContext } from "react"
import { ItemContextType } from "../../../@types/item"
import { ItemContext } from "../../../context/itemContext"
import { Item } from "./Item"
import './list-items.css'

const months = ['January', 'February', 'March', 'April', 'May', 'Juny', 'July', 'August', 'September', 'October', 'November', 'December'];

interface IListItems {
  selectedItemId: string;
  setSelectedItemId: Dispatch<SetStateAction<string>>;
}

export const ListItems = ({ selectedItemId, setSelectedItemId }: IListItems) => {
  const { items } = useContext(ItemContext) as ItemContextType;

  return (
    <div>
      <div className="items--filter__container">
        <p>order by </p>
        <i className="fa-solid fa-filter"></i>
      </div>
      <div className="item_list">
        <p className="month">{months[new Date().getMonth()]}</p>
        {
          items.map(item =>
            <Item
              key={item.id}
              id={item.id}
              value={item.value}
              category={item.category}
              description={item.description}
              data={item.data}
              selectedItemId={selectedItemId}
              setSelectedItemId={setSelectedItemId}
            />
          )
        }
      </div>
    </div>
  )
}
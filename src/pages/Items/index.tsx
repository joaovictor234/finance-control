import CardItem from "./Card"
import { ItemForm } from "./Form"
import { ListItems } from "./List"
import styles from './items.module.css';
import { useContext, useEffect, useState } from "react";
import { ItemContext } from "../../context/itemContext";
import { Item, ItemContextType } from "../../@types/item";

export const Items = () => {
  const [selectedItemId, setSelectedItemId] = useState('');
  const [toggleFormItem, setToggleFormItem] = useState(false);
  const { items } = useContext(ItemContext) as ItemContextType;
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  useEffect(() => {
    if (selectedItemId) {
      let [item] = items.filter(item => item.id === selectedItemId);
      setSelectedItem(item);
    }
  }, [selectedItemId, items]);

  return (
    <div className={styles.items}>
      <CardItem
        selectedItemId={selectedItemId}
        setToggleFormItem={setToggleFormItem} />
      <ListItems
        selectedItemId={selectedItemId}
        setSelectedItemId={setSelectedItemId} />
      {toggleFormItem && <ItemForm
        toggleFormItem={toggleFormItem}
        setToggleFormItem={setToggleFormItem}
        item={selectedItem}
        setItem={setSelectedItem} />}
    </div>
  )
}
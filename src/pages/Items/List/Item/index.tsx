import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { formatDataBRL } from '../../../../services/formatData'
import styles from './item.module.css'

interface IItem {
  id: string;
  value: number;
  description: string;
  category: string;
  data: Date;
  selectedItemId: string;
  setSelectedItemId: Dispatch<SetStateAction<string>>;
}

export const Item = ({
  id,
  value,
  category,
  description,
  data,
  selectedItemId,
  setSelectedItemId }: IItem) => {

  const [isSelected, setIsSelected] = useState(false);

  const selectThisItem = () => {
    if (isSelected) setSelectedItemId('');
    else setSelectedItemId(id);
  }

  useEffect(() => {
    if (selectedItemId === id) setIsSelected(true);
    else setIsSelected(false)
  }, [selectedItemId, id]);

  return (
    <div className={isSelected ?
      `${styles.item_container} ${styles.item_selected}` :
      `${styles.item_container}`} onClick={selectThisItem}>
      <div className={styles.content}>
        <div>
          <p className={styles.item_emphasis}>{value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</p>
          <p className={`${styles.item_emphasis} ${styles.item_leftBar}`}>{category}</p>
          <p className={`${styles.item_emphasis} ${styles.item_leftBar}`}>{formatDataBRL(data)}</p>
        </div>
        <p className={styles.item}>{description}</p>
      </div>
    </div>
  )
}
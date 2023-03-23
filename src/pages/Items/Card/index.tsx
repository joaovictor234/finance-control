import { Dispatch, SetStateAction, useContext } from "react";
import { MoneyContextType } from "../../../@types/money";
import { MoneyContext } from "../../../context/moneyContext";
import { formatMoneyToBRL } from "../../../services/formatMoney";
import styles from './carditem.module.css';

interface ICardItem {
  selectedItemId: string;
  setToggleFormItem: Dispatch<SetStateAction<boolean>>;
}

const CardItem = ({ selectedItemId, setToggleFormItem }: ICardItem) => {
  const { money, remainingAmount } = useContext(MoneyContext) as MoneyContextType;

  return (
    <div className={styles.card_container}>
      <p>Money: <span>{formatMoneyToBRL(money)}</span></p>
      <p>Remaining money: <span>{formatMoneyToBRL(remainingAmount)}</span></p>
      <div>
        {
          selectedItemId &&
          <>
            <button
              className={styles.edit}
              title="Edit item">
              <i className="fa-solid fa-pen"></i>
            </button>
            <button
              className={styles.delete}
              title="Delete item">
              <i className="fa-solid fa-trash"></i>
            </button>
          </>
        }
        <button
          className={styles.add_button}
          onClick={() => setToggleFormItem(true)}
          title="Add a new item">
          <i className="fa-solid fa-plus"></i>
        </button>
      </div>
    </div>
  )
}

export default CardItem;
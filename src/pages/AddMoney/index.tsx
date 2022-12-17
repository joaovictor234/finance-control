import { ChangeEvent, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { MoneyContextType } from "../../@types/money";
import { Header } from "../../components/Header"
import { MoneyContext } from "../../context/moneyContext";
import { formatMoneyToBRL } from "../../services/formatMoney";
import './add-money.css';

export const AddMoney = () => {

  const { money, setMoney } = useContext(MoneyContext) as MoneyContextType;
  const [inputMoney, setInputMoney] = useState(formatMoneyToBRL(money));

  const handleInputMoney = (event: ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value.replace(/\D/g, '');
    const options = { minimumFractionDigits: 2 };
    const formatedMoney = new Intl.NumberFormat('pt-BR', options).format(parseFloat(value) / 100)
    setInputMoney("R$ " + formatedMoney);
  }

  const addMoney = () => {
    let value = parseFloat(inputMoney.replace(/\D/g, ''));
    setMoney(value / 100)
  }

  return (
    <div>
      <Header pageTitle="Add Money" />
      <p className="legend">What's the value you want do add?</p>
      <div className="form">
        <input
          type="text"
          className="input--money"
          placeholder='R$ 0,00'
          onChange={handleInputMoney}
          value={inputMoney} />

        <div className="redirect--buttons__container">
          <Link to='/'>
            <button className="redirect--button" aria-label="return to main page">
              <i className="fa-solid fa-arrow-left"></i>
            </button>
          </Link>
          {
            parseInt(inputMoney.replace(/\D/g, '')) > 0 ?
            <Link to='/add-categories'>
              <button onClick={addMoney} className='redirect--button'>
                <i className="fa-solid fa-arrow-right"></i>
              </button>
            </Link> :
            <button className="redirect--button disabled">
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          }
        </div>
      </div>
    </div>
  )
}
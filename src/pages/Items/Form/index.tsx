import { ChangeEvent, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { v1 } from 'uuid';
import { CategoryContextType } from '../../../@types/category';
import { Item, ItemContextType } from '../../../@types/item';
import { MoneyContextType } from '../../../@types/money';
import { CategoryContext } from '../../../context/categoryContext';
import { ItemContext } from '../../../context/itemContext';
import { MoneyContext } from '../../../context/moneyContext';
import { isValueGreaterThanCategoriesValues } from '../../../services/compareFunctions';
import { formatMoneyBRLToNumber, formatMoneyToBRL } from '../../../services/formatMoney';
import './form-item.css';

interface IItemForm {
  toggleFormItem: boolean;
  setToggleFormItem: Dispatch<SetStateAction<boolean>>;
  item: Item | null;
  setItem: Dispatch<SetStateAction<Item | null>>;
}

export const ItemForm = ({ toggleFormItem, setToggleFormItem, item, setItem }: IItemForm) => {
  const { remainingAmount, setRemainingAmount } = useContext(MoneyContext) as MoneyContextType;
  const { categories, setCategories } = useContext(CategoryContext) as CategoryContextType;
  const { items, setItems } = useContext(ItemContext) as ItemContextType;

  const [addNewItem, setAddNewItem] = useState(false);
  const [value, setValue] = useState('R$ 0,00');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [validateData, setValidateData] = useState(false);
  const [editItem, setEditItem] = useState(false);

  const handleValue = (event: ChangeEvent<HTMLInputElement>) => {
    let val = event.target.value.replace(/\D/g, '');
    const options = { minimumFractionDigits: 2 };
    const formatedMoney = new Intl.NumberFormat('pt-BR', options).format(parseFloat(val) / 100);
    setValue('R$ ' + formatedMoney)
  }

  const handleDescription = (event: ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  }

  const handleCategory = (event: ChangeEvent<HTMLSelectElement>) => {
    setCategory(event.target.value)
  }

  const addItem = () => {
    let money = formatMoneyBRLToNumber(value);
    setRemainingAmount(remainingAmount - money);
    const year = new Date().getFullYear();
    const month = new Date().getMonth();
    const day = Math.floor(Math.random() * (31 - 1) + 1);
    let newItem: Item = {
      value: money,
      description: description,
      category: category,
      data: new Date(year, month, day),
      id: v1()
    }
    let updatedCategories = categories.map(c => {
      if (c.name === category) {
        c.amountSpent += money;
        c.remainingAmount = c.value - c.amountSpent;
      }
      return c;
    })
    setCategories([...updatedCategories]);
    setItems([...items, newItem]);
    setValidateData(false);
    setAddNewItem(true);
    setValue('R$ 0,00');
    setDescription('');
    setCategory('');
  }

  const updateItem = () => {
    let money = formatMoneyBRLToNumber(value);
    const updatedItems = items.map(i => {
      if(i.id === item?.id) {
        return {
          id: item.id,
          value: money,
          description,
          category
        } as Item;
      }
      else return i;
    })
    setItems(updatedItems);
  }

  useEffect(() => {
    let numberValue = formatMoneyBRLToNumber(value);
    let isGreaterThan = isValueGreaterThanCategoriesValues(numberValue, categories, category);
    if (
      value !== 'R$ 0,00' &&
      category !== '' &&
      description !== '' &&
      !isGreaterThan)
      setValidateData(true);
    else setValidateData(false);
  }, [value, categories, category, description]);

  useEffect(() => {
    if (item) {
      setEditItem(true);
      setValue(formatMoneyToBRL(item.value));
      setCategory(item.category);
      setDescription(item.description);
    }
  }, [item]);

  useEffect(() => {
    return () => setItem(null);
  }, [setItem])

  useEffect(() => {
    if(addNewItem) setTimeout(() => setAddNewItem(false), 5000);
  }, [addNewItem]);

  return (
    <div>
      <div className={
        toggleFormItem ?
          'addItem--container down_container' :
          'addItem--container up_container'
      }>
        <div className='addItem--header'>
          <p>Add a new item</p>
        </div>
        <label htmlFor="value" className='addItem--field__container'>
          <p>Value:</p>
          <input
            type="text"
            placeholder='R$ 0,00'
            onChange={handleValue}
            value={value}
            className="addItem--field"
            required />
        </label>
        <label htmlFor="value" className='addItem--field__container'>
          <p>Description:</p>
          <input
            type="text"
            onChange={handleDescription}
            value={description}
            className="addItem--field"
            required />
        </label>
        <label htmlFor="value" className='addItem--field__container'>
          <p>Category:</p>
          <select
            name="category"
            id="category"
            onChange={handleCategory}
            value={category}
            className="addItem--field"
            required>
            <option value="">Select one</option>
            {categories.map(c =>
              <option key={c.name} disabled={
                formatMoneyBRLToNumber(value) > c.remainingAmount ? true : false
              }>{c.name}</option>
            )}
          </select>
        </label>
        <div className='form_buttons'>
          <button className='close' onClick={() => setToggleFormItem(false)}>Close</button>
          {
            validateData ?
              <button onClick={editItem ? updateItem : addItem} className="add">
                {editItem ? 'Update' : 'Save'}
              </button> :
              <button className='disabled'>{editItem ? 'Update' : 'Save'}</button>
          }
        </div>
      </div>
      {
        addNewItem &&
        <div className='message'>
          <div>
            <p>A new item is added!</p>
            <button onClick={() => setAddNewItem(false)}>
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
          <div
            className='progress'></div>
        </div>
      }
    </div>
  )
}
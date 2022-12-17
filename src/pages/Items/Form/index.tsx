import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { v1 } from 'uuid';
import { CategoryContextType } from '../../../@types/category';
import { Item, ItemContextType } from '../../../@types/item';
import { CategoryContext } from '../../../context/categoryContext';
import { ItemContext } from '../../../context/itemContext';
import { isValueGreaterThanCategoriesValues } from '../../../services/compareFunctions';
import { formatMoneyBRLToNumber } from '../../../services/formatMoney';
import './form-item.css';

export const ItemForm = () => {

  const { categories, setCategories } = useContext(CategoryContext) as CategoryContextType;
  const { items , setItems } = useContext(ItemContext) as ItemContextType;

  const [addNewItem, setAddNewItem] = useState(false);
  const [value, setValue] = useState('R$ 0,00');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [validateData, setValidateData] = useState(false);

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
    let newItem: Item = {
      value: money,
      description: description,
      category: category,
      data: new Date,
      id: v1()
    }
    let updatedCategories = categories.map(c => {
      if(c.name === category) {
        c.amountSpent += money;
        c.remainingAmount = c.value - c.amountSpent;
      }
      return c;
    })
    setCategories([...updatedCategories]);
    setItems([...items, newItem]);
    setValidateData(false);
    setAddNewItem(false);
    setValue('R$ 0,00');
    setDescription('');
    setCategory('');
  }

  useEffect(() => {
    let numberValue = formatMoneyBRLToNumber(value);
    let isGreaterThan = isValueGreaterThanCategoriesValues(numberValue, categories, category);
    if(
      value !== 'R$ 0,00' && 
      category !== '' && 
      description !== '' &&
      !isGreaterThan) 
      setValidateData(true);
    else setValidateData(false);
  })

  return (
    <div>
      {
        addNewItem ?
          <div className='addItem--container'>
            <div className='addItem--header'>
              <button onClick={() => setAddNewItem(false)}>
                <i className="fa-solid fa-xmark addItem--close"></i>
              </button>
              <p>Add a new item</p>
              <div></div>
            </div>
            <label htmlFor="value" className='addItem--field__container'>
              <p>Value:</p>
              <input
                type="text"
                placeholder='R$ 0,00'
                onChange={handleValue}
                value={value}
                className="addItem--field" 
                required/>
            </label>
            <label htmlFor="value" className='addItem--field__container'>
              <p>Description:</p>
              <input
                type="text"
                onChange={handleDescription}
                value={description}
                className="addItem--field" 
                required/>
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
            {
              validateData ?
              <button onClick={addItem} className='addItem--button'>
                ADD
              </button> :
              <button className='addItem--button disabled'>ADD</button>
            }
          </div>
          :
          <button
            className='add--item__button'
            title='add an item'
            onClick={() => setAddNewItem(true)}>
            <i className="fa-solid fa-plus"></i>
          </button>
      }
    </div>
  )
}
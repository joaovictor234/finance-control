import { ChangeEvent, Dispatch, MouseEvent, SetStateAction, useContext, useState } from "react";
import { Category } from "../../../../@types/category";
import { MoneyContextType } from "../../../../@types/money";
import { MoneyContext } from "../../../../context/moneyContext";
import { formatMoneyToBRL } from "../../../../services/formatMoney";
import './category.css';

interface ICategoryCard {
  category: Category;
  categories: Category[];
  setCategories: Dispatch<SetStateAction<Category[]>>;
  openCards: boolean[];
  setOpenCards: Dispatch<SetStateAction<boolean[]>>;
}

export const CategoryCard = ({ category, categories, setCategories, openCards, setOpenCards }: ICategoryCard) => {

  const {money} = useContext(MoneyContext) as MoneyContextType;

  const [edit, setEdit] = useState(false);
  const [currCategory, setCurrCategory] = useState(category.name);
  const [openIndex, setOpenIndex] = useState(categories.findIndex(c => c.id === category.id))

  const handleInputPercentage = (event: ChangeEvent<HTMLInputElement>) => {
    let percentage = Number(event.target.value);
    let updatedCategories: Category[] = []
    if (percentage >= 0 && percentage <= 100) {
      updatedCategories = categories.map(currentCategory => {
        if (currentCategory.id === category.id) {
          currentCategory.percentage = parseFloat(percentage.toFixed(2));
          currentCategory.value = money * (percentage/100);
          currentCategory.remainingAmount = currentCategory.value;
        }
        return currentCategory;
      })
      setCategories(updatedCategories);
    }
  }

  const handleOpenCategoryOptions = (event: MouseEvent) => {
    for(let i = 0; i < openCards.length; i++) {
      if(i === openIndex) openCards[i] = !openCards[i];
      else openCards[i] = false;
    }
    setOpenCards([...openCards])
  }

  const editCategory = () => {
    setEdit(true);
    let input = document.getElementById(`category-${category.id}`);
    input?.focus();
  }
  const handleChangeEditCategory = (event: ChangeEvent<HTMLInputElement>) => {
    setCurrCategory(event.target.value);
  }
  const handleBlurEdit = () => {
    let updatedCategories = categories.map(c => {
      if(c.id === category.id) {
        c.name = currCategory;
      }
      return c;
    })
    setCategories(updatedCategories);
    setEdit(false);
  }

  const deleteCategory = () => {
    const updatedCategories = categories.filter(currCategory => currCategory.id !== category.id);
    setCategories(updatedCategories);
  }

  return (
    <div>
      <div className="category--container">
        <div onClick={handleOpenCategoryOptions}>
          {
            edit ?
            <input 
              id={`category-${category.id}`}
              value={currCategory}
              onChange={handleChangeEditCategory}
              onBlur={handleBlurEdit}
              className="edit--category"/> :
            <div>
              <p className="category--name">{category.name}</p>
              <p className="category--value">{formatMoneyToBRL(category.value)}</p>
            </div>
          }
          {
            openCards[openIndex] ?
              <i className="fa-solid fa-chevron-up"></i> :
              <i className="fa-solid fa-chevron-down"></i>
          }
        </div>
        <input
          type="number"
          value={category.percentage === 0 ? '' : category.percentage} className={category.percentage === 0 ? "category--percentage category--percantage__iszero" : "category--percentage"}
          onChange={handleInputPercentage}
          max={100} min={0} 
          maxLength={5}/>
      </div>
      {
        openCards[openIndex] &&
        <div className="category--options">
          <button className="category--button button--edit" onClick={editCategory}>
            <i className="fa-solid fa-pen option--icon"></i>EDIT
          </button>
          <button className="category--button button--delete" onClick={deleteCategory}>
            <i className="fa-solid fa-trash option--icon"></i>DELETE
          </button>
        </div>
      }
    </div>
  )
}
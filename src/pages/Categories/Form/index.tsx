import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from "react"
import { Category } from "../../../@types/category";
import { v1 } from 'uuid';
import './category--form.css';

interface ICategoryForm {
  categories: Category[];
  setCategories: Dispatch<SetStateAction<Category[]>>;
}

export const CategoryForm = ({ categories, setCategories }: ICategoryForm) => {

  const [value, setValue] = useState('');
  const [inputOnFocus, setInputOnFocus] = useState(false);

  const handleCategory = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length <= 20) setValue(event.target.value)
  }

  const addNewCategory = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setInputOnFocus(false);
    if (value !== '') {
      let newCategory: Category = {
        id: v1(),
        name: value,
        percentage: 0,
        value: 0,
        amountSpent: 0,
        remainingAmount: 0
      }
      setValue('');
      setCategories([...categories, newCategory]);
    }
  }

  return (

    <div className="container">
      <p className="legend">Create a new category</p>
      <form className="form--addCategory" onSubmit={addNewCategory}>
        <div>
          <input
            type="text"
            onChange={handleCategory}
            value={value}
            onKeyPress={e => e.key === 'Enter' && addNewCategory}
            onFocus={() => setInputOnFocus
              (true)} />
          {
            inputOnFocus &&
            <p className="warning">the category have {value.length}/20 characters</p>
          }
        </div>
        <button>ADD</button>
      </form>
    </div>
  )
}
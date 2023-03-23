import { useContext } from "react";
import { CategoryContextType } from "../../@types/category";
import { CategoriesList } from "./List";
import { CategoryForm } from "./Form";
import { CategoryContext } from "../../context/categoryContext";
import './add-categories.css';

export const AddCategories = () => {

  const { categories, setCategories } = useContext(CategoryContext) as CategoryContextType;

  return (
    <div>
      <CategoryForm
        categories={categories}
        setCategories={setCategories} />
      {
        categories.length !== 0 &&
        <CategoriesList
          categories={categories}
          setCategories={setCategories} />
      }
    </div>
  )
}
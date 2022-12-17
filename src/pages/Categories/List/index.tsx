import { Category } from "../../../@types/category";
import { CategoryCard } from "./Category"
import './categories.css'
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { AuxCard } from "../AuxCard";
import { Link } from "react-router-dom";

interface ICategoriesList {
  categories: Category[];
  setCategories: Dispatch<SetStateAction<Category[]>>
}

export const CategoriesList = ({ categories, setCategories }: ICategoriesList) => {

  const [sumPercentages, setSumPercentages] = useState(0);
  const [thereNumber0, setThereNumber0] = useState(false);
  const [allDataIsValid, setAllDataIsValid] = useState(false);
  const [openCards, setOpenCards] = useState<boolean[]>([]);

  useEffect(() => {
    let sum = 0;
    categories.forEach(category => {
      sum += category.percentage;
      if(openCards.length < categories.length) {
        setOpenCards([...openCards, false]);
      }
    });

    if (categories.find(category => category.percentage === 0)) setThereNumber0(true);
    else setThereNumber0(false);

    setAllDataIsValid((!thereNumber0 && sumPercentages === 100));

    setSumPercentages(sum);
  }, [categories, sumPercentages]);

  return (
    <>
      <div className="categories--container">

        <AuxCard 
          sumPercentages={sumPercentages}
          allDataIsValid={allDataIsValid}/>

        <div className="categories--header">
          <p>Category</p>
          <p className="categories--header__percentage">%</p>
        </div>

        {categories.map((category, index) =>
          <CategoryCard
            key={index}
            category={category}
            categories={categories}
            setCategories={setCategories} 
            openCards={openCards}
            setOpenCards={setOpenCards}/>)}

        <div className={
          sumPercentages === 100 ?
            "percentages--container percentage--is100" :
            "percentages--container percentage--isnot100"}>
          <p className="percentages--legend">The sum of percentages is</p>
          <p className="percentage--sum">
            {sumPercentages}%
          </p>
        </div>

        {
          (allDataIsValid) ?
            <Link to='/items'>
              <button className="categories--button categories--button__enabled">ADD CATEGORIES</button>
            </Link> :
            <button className="categories--button categories--button__disabled">ADD CATEGORIES</button>
        }

      </div>
    </>
  )
}
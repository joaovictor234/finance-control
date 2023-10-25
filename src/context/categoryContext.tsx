import { createContext, useContext, useEffect, useState } from "react";
import { CategoryContextType } from "../@types/CategoryContextType";
import { Category } from "../models/Category";
import { CATEGORY_COLORS, COLORS } from "../constants/colors";
import { ICONS } from "../constants/icons";
import { ContextProps } from "../interface/ContextProps";
import { AuthContext } from "./AuthContext";
import { AuthContextType } from "../@types/AuthContextType";

export const CategoryContext = createContext<CategoryContextType | null>(null);

const CategoryContextProvider = ({ children }: ContextProps) => {
  const { userToken } = useContext(AuthContext) as AuthContextType;
  const [categories, setCategories] = useState<Category[]>([]);
  const [colors, setColors] = useState<string[]>(
    Object.values(CATEGORY_COLORS)
  );
  const [usedColors, setUsedColors] = useState<string[]>([]);
  const [icons, setIcons] = useState<string[]>(Object.values(ICONS));
  const [usedIcons, setUsedIcons] = useState<string[]>([]);

  const addCategory = (category: Category) => {
    const notUsedColors = colors.filter((color) => color !== category.color);
    setColors(notUsedColors);
    setUsedColors((currColors) => [...currColors, category.color]);

    const notUsedIcons = icons.filter((icon) => icon !== category.icon);
    setIcons(notUsedIcons);
    setUsedIcons((currIcons) => [...currIcons, category.icon]);
    setCategories((currCategories) => [...currCategories, category]);
  };

  const addCategories = (category: Category[]) => {
    setCategories(category);
  };

  const removeCategory = (id: string) => {
    const [removedCategory] = categories.filter(
      (category) => category.id === id
    );

    const notRemovedColors = [...usedColors];
    const [removedColor] = notRemovedColors.splice(
      notRemovedColors.indexOf(removedCategory.color),
      1
    );
    setColors((currColors) => [...currColors, removedColor]);
    setUsedColors(notRemovedColors);

    const notRemovedIcons = [...usedIcons];
    const [removedIcon] = notRemovedIcons.splice(
      notRemovedIcons.indexOf(removedCategory.icon),
      1
    );
    setIcons((currIcons) => [...currIcons, removedIcon]);
    setUsedIcons(notRemovedIcons);

    const filteredCategories = categories.filter(
      (category) => category.id !== id
    );
    if (filteredCategories) {
      setCategories(filteredCategories);
    }
  };

  const updateCategory = (updatedCategory: Category): Category => {
    const updatedCategories = categories.map((category) => {
      if (category.id === updatedCategory.id) {
        if (category.color !== updatedCategory.color) {
          const filteredUsedColors = usedColors.filter(
            (color) => color !== category.color
          );
          const filteredColors = colors.filter(
            (color) => color !== updatedCategory.color
          );
          setUsedColors([...filteredUsedColors, updatedCategory.color]);
          setColors([...filteredColors, category.color]);
        }
        if (category.icon !== updatedCategory.icon) {
          const filteredUsedIcons = usedIcons.filter(
            (icon) => icon !== category.icon
          );
          const filteredIcons = icons.filter(
            (icon) => icon !== updatedCategory.icon
          );
          setUsedIcons([...filteredUsedIcons, updatedCategory.icon]);
          setIcons([...filteredIcons, category.icon]);
        }
        return updatedCategory;
      } else return category;
    });
    setCategories(updatedCategories);
    return updatedCategory;
  };

  const calculateTotalPercentage = () => {
    return (
      categories.reduce((acc, category) => acc + category.percentage, 0) * 100
    );
  };

  const calculateTotalValue = () => {
    return categories.reduce((acc, category) => acc + category.totalValue, 0);
  };

  const calculateTotalRemaining = () => {
    return categories.reduce(
      (acc, category) => acc + category.totalRemaining,
      0
    );
  };

  useEffect(() => {
    if (!userToken) {
      setCategories([]);
    }
  }, [userToken]);

  const value = {
    icons,
    colors,
    categories,
    addCategory,
    addCategories,
    removeCategory,
    updateCategory,
    calculateTotalValue,
    calculateTotalPercentage,
    calculateTotalRemaining,
  };

  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryContextProvider;

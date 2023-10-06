import { useContext } from "react";
import { ScrollView } from "react-native";

import AddCategoriesList from "../components/AddCategories/List";
import AddCategoriesForm from "../components/AddCategories/Form";
import { CategoryContext } from "../context/CategoryContext";
import { CategoryContextType } from "../@types/CategoryContextType";

const AddCategories = () => {
  const { categories } = useContext(CategoryContext) as CategoryContextType;

  return (
    <ScrollView>
      <AddCategoriesForm />
      {categories.length !== 0 && <AddCategoriesList />}
    </ScrollView>
  );
};

export default AddCategories;
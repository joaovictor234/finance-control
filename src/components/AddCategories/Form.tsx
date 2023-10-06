import { useState, Dispatch, SetStateAction, useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import Input from "../UI/Input";
import Button from "../UI/Button";
import { Category } from "../../models/Category";
import { CategoryContext } from "../../context/CategoryContext";
import { CategoryContextType } from "../../@types/CategoryContextType";

const AddCategoriesForm = () => {
  const { colors, icons, addCategory } = useContext(
    CategoryContext
  ) as CategoryContextType;
  const [category, setCategory] = useState("");

  const addNewCategoryHandle = () => {
    const randomIconIndex = Math.floor(Math.random() * (icons.length - 1));
    const randomColorIndex = Math.floor(Math.random() * (colors.length - 1));

    if (category) {
      const newCategory: Category = {
        id: new Date().getTime().toString() + Math.random(),
        color: colors[randomColorIndex],
        icon: icons[randomIconIndex],
        name: category,
        percentage: 0,
        totalRemaining: 0,
        totalValue: 0,
      };
      addCategory(newCategory);
      setCategory("");
    }
  };

  return (
    <View style={styles.form}>
      <Text>Adicionar categoria</Text>
      <Input onChangeText={(e) => setCategory(e)} value={category} />
      <Button
        title=""
        disabled={!category}
        onPress={category ? addNewCategoryHandle : () => {}}
      >
        ADICIONAR
      </Button>
    </View>
  );
};

export default AddCategoriesForm;

const styles = StyleSheet.create({
  form: {
    padding: 10,
  },
});

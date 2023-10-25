import { View, StyleSheet, ScrollView } from "react-native";
import InfoView from "../components/Categories/InfoView";
import MonthChanger from "../components/UI/MonthChanger";
import Button from "../components/UI/Button";
import { useContext, useEffect, useState } from "react";
import { Category } from "../models/Category";
import { CategoryContext } from "../context/CategoryContext";
import { CategoryContextType } from "../@types/CategoryContextType";
import { HEIGHT_SCREEN } from "../constants/dimensions";

const Categories = () => {
  const {categories} = useContext(CategoryContext) as CategoryContextType;
  const [localCategories, setLocalCategories] = useState<Category[]>([]);

  useEffect(() => {
    setLocalCategories(categories);
  }, [categories]);

  return (
    <ScrollView style={styles.screen}>
      <MonthChanger />
      <InfoView categories={localCategories} />
      <View style={styles.buttonView}>
        <Button title="">Editar</Button>
      </View>
    </ScrollView>
  );
};

export default Categories;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingVertical: HEIGHT_SCREEN / 100 * 0.5,
    paddingHorizontal: HEIGHT_SCREEN / 100 * 1,
    backgroundColor: "#fff",
    paddingBottom: 50,
  },
  buttonView: {
    paddingBottom: 50
  }
});

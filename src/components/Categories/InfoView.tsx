import { StyleSheet, Text, View } from "react-native";
import CategoryItem from "./CategoryItem";
import { Category } from "../../models/Category";
import { HEIGHT_SCREEN } from "../../constants/dimensions";
import { useContext, useEffect, useState } from "react";
import { CategoryContext } from "../../context/CategoryContext";
import { CategoryContextType } from "../../@types/CategoryContextType";

interface CategoryInfoViewProps {
  categories: Category[];
}

const CategoryInfoView = ({ categories }: CategoryInfoViewProps) => {
  const {
    calculateTotalPercentage,
    calculateTotalRemaining,
    calculateTotalValue,
  } = useContext(CategoryContext) as CategoryContextType;
  const [categoryTotal, setCategoryTotal] = useState<Category>({
    id: "1",
    color: "#555",
    icon: "cube",
    name: "Total",
    percentage: calculateTotalPercentage(),
    totalRemaining: calculateTotalRemaining(),
    totalValue: calculateTotalValue(),
  });

  return (
    <View style={styles.info}>
      <Text>Informações Gerais</Text>
      <CategoryItem category={categoryTotal} />
      {categories &&
        categories.map((category) => (
          <CategoryItem key={category.id} category={category} />
        ))}
    </View>
  );
};

export default CategoryInfoView;

const styles = StyleSheet.create({
  info: {
    marginTop: (HEIGHT_SCREEN / 100) * 0.5,
    marginBottom: (HEIGHT_SCREEN / 100) * 1,
  },
});

import { StyleSheet, Text, View } from "react-native";
import CategoryItem from "./CategoryItem";
import { Category } from "../../models/Category";

interface CategoryInfoViewProps {
  categories: Category[];
}

const CategoryInfoView = ({categories}: CategoryInfoViewProps) => {

  return (
    <View style={styles.info}>
      <Text>Informações Gerais</Text>
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
    marginTop: 10,
    marginBottom: 20,
  },
});

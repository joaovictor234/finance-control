import { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { CategoryContext } from "../../context/CategoryContext";
import { CategoryContextType } from "../../@types/CategoryContextType";
import CategoryItem from "./CategoryItem";

const InfoView = () => {
  const { categories } = useContext(CategoryContext) as CategoryContextType;

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

export default InfoView;

const styles = StyleSheet.create({
  info: {
    marginTop: 10,
    marginBottom: 20
  }
})
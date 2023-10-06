import { Picker } from "@react-native-picker/picker";
import { useContext, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { CategoryContext } from "../../context/CategoryContext";
import { CategoryContextType } from "../../@types/CategoryContextType";
import Input from "../UI/Input";

const ItemFilter = () => {
  const { categories } = useContext(CategoryContext) as CategoryContextType;
  const [filterByCategory, setFilterByCategory] = useState("");
  const [filterByValue, setFilterByValue] = useState(0);
  const [filterByDate, setFilterByDate] = useState(new Date());

  return (
    <View>
      <View>
        <Text>Filtrar por</Text>
      </View>
      <View style={styles.filterContainer}>
        <Picker
          style={styles.filterType}
          selectedValue={filterByCategory}
          onValueChange={(itemValue) => setFilterByCategory(itemValue)}
        >
          <Picker.Item value={""} label="Categoria" />
          {categories &&
            categories.map((category) => (
              <Picker.Item
                key={category.id}
                value={category.name}
                label={category.name}
              />
            ))}
        </Picker>
        <Input style={styles.filterType} placeholder="Valor" />
        <Input style={styles.filterType} placeholder="Data" />
      </View>
    </View>
  );
};

export default ItemFilter;

const styles = StyleSheet.create({
  filterContainer: {
    display: "flex",
    flexDirection: "row",
  },
  filterType: {
    flex: 1,
  },
});

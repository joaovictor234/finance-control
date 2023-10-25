import { StyleSheet, Text, View } from "react-native";
import { Item } from "../../models/Item";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import { COLORS } from "../../constants/colors";
import { useContext, useEffect, useState } from "react";
import { CategoryContext } from "../../context/CategoryContext";
import { CategoryContextType } from "../../@types/CategoryContextType";
import { Category } from "../../models/Category";
import { HEIGHT_SCREEN, WIDTH_SCREEN } from "../../constants/dimensions";

interface IItemComponent {
  item: Item;
}

const ItemComponent = ({ item }: IItemComponent) => {
  const { categories } = useContext(CategoryContext) as CategoryContextType;
  const [category, setCategory] = useState<Category | null>(null);

  useEffect(() => {
    const [selectedCategory] = categories.filter(
      (category) => category.name === item.category
    );
    setCategory(selectedCategory);
  }, [item]);

  return (
    <View style={styles.item}>
      <View style={styles.iconCategory}>
        <View
          style={[
            styles.iconContainer,
            { backgroundColor: category ? category.color : COLORS.borderColor },
          ]}
        >
          <Ionicons
            name={category ? category.icon : "star"}
            size={WIDTH_SCREEN / 100 * 6}
            style={[styles.emphasis, styles.iconCategory]}
          />
        </View>
      </View>
      <View style={styles.description}>
        <Text style={styles.text}>{item.description}</Text>
        <View style={styles.category}>
          <Text style={[styles.text, styles.emphasis]}>{item.category}</Text>
          <Text style={[styles.text, styles.emphasis]}>
            {"R$ " + item.value.toFixed(2).replace(".", ",")}
          </Text>
        </View>
      </View>
      <View style={styles.detailsIcon}>
        <MaterialIcons
          name="keyboard-arrow-right"
          size={WIDTH_SCREEN / 100 * 6}
          color="black"
          style={styles.icon}
        />
      </View>
    </View>
  );
};

export default ItemComponent;

const styles = StyleSheet.create({
  item: {
    display: "flex",
    flexDirection: "row",
    paddingHorizontal: (HEIGHT_SCREEN / 100) * 0.5,
    paddingVertical: (HEIGHT_SCREEN / 100) * 0.5,
    marginHorizontal: (HEIGHT_SCREEN / 100) * 0.5,
    marginVertical: (HEIGHT_SCREEN / 100) * 0.5,
    backgroundColor: "#fff",
    borderRadius: 5,
    elevation: 4,
  },
  iconContainer: {
    padding: (HEIGHT_SCREEN / 100) * 0.5,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  iconCategory: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
  },
  text: {
    fontSize: WIDTH_SCREEN / 100 * 3.8,
  },
  description: {
    flex: 8,
    display: "flex",
    justifyContent: "space-between",
    marginLeft: 10,
    paddingLeft: 5,
    borderLeftWidth: 1,
    borderLeftColor: COLORS.borderColor,
  },
  category: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  detailsIcon: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    color: COLORS.primary50,
  },
  emphasis: {
    fontWeight: "600",
  },
});

import { StyleSheet, Text, View } from "react-native";
import { Category } from "../../models/Category";
import { COLORS } from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { formatToBRL } from "../../utils/formatToBRL";

interface CategoryProps {
  category: Category | null;
}

const CategoryItem = ({ category }: CategoryProps) => {
  return (
    <View
      style={[
        styles.categoryCard,
        { borderLeftColor: category ? category.color : COLORS.borderColor },
      ]}
    >
      <View style={styles.categoryContent}>
        {/* <Ionicons
          style={styles.icon}
          color={category ? category.color : COLORS.borderColor}
          name={category ? category.icon : "star"}
          size={24}
        /> */}
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>
            {category ? category.name : "Categoria"}
          </Text>
          <View>
            <View style={styles.amount}>
              <Text>Valor gasto</Text>
              <Text>Valor restante</Text>
            </View>
            <View style={styles.amount}>
              <Text style={styles.value}>
                {formatToBRL(
                  category ? category.totalValue - category.totalRemaining : 0
                )}
              </Text>
              <Text style={styles.value}>
                {formatToBRL(category ? category.totalRemaining : 0)}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.barContainer}>
        <View
          style={[
            styles.barCategory,
            {
              width: `${
                category
                  ? ((category.totalValue - category.totalRemaining) /
                      category.totalValue) *
                    100
                  : 0
              }%`,
              backgroundColor: category ? category.color : COLORS.borderColor,
            },
          ]}
        ></View>
      </View>
    </View>
  );
};

export default CategoryItem;

const styles = StyleSheet.create({
  categoryCard: {
    borderLeftWidth: 10,
    marginVertical: 5,
    borderRadius: 5,
    paddingHorizontal: 8,
    borderTopColor: COLORS.borderColor,
    borderTopWidth: 1,
    borderRightColor: COLORS.borderColor,
    borderRightWidth: 1,
    borderBottomColor: COLORS.borderColor,
    borderBottomWidth: 1,
    backgroundColor: "#fff",
    elevation: 4,
  },
  categoryContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    paddingHorizontal: 5,
  },
  name: {
    fontSize: 18,
  },
  barContainer: {
    backgroundColor: COLORS.borderColor,
    marginVertical: 5,
    borderRadius: 20,
  },
  barCategory: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 10,
  },
  amount: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  value: {
    fontWeight: "600",
  },
});

import { Text, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useContext, useEffect, useState } from "react";
import { CategoryContext } from "../../context/CategoryContext";
import { CategoryContextType } from "../../@types/CategoryContextType";
import { formatToBRL } from "../../utils/formatToBRL";
import { COLORS } from "../../constants/colors";

const Currency = () => {
  const { categories, calculateTotalValue, calculateTotalRemaining } =
    useContext(CategoryContext) as CategoryContextType;
  const [totalSpent, setTotalSpent] = useState(0);
  const [totalRemaining, setTotalRemaining] = useState(0);

  useEffect(() => {
    setTotalSpent(calculateTotalValue() - calculateTotalRemaining());
    setTotalRemaining(calculateTotalRemaining());
  }, [categories]);

  return (
    <View style={styles.container}>
      <View style={[styles.valueContainer, styles.spent]}>
        <Text style={styles.legend}>Total gasto</Text>
        <Text style={styles.value}>
          {formatToBRL(totalSpent)}
        </Text>
      </View>
      <View style={[styles.valueContainer, styles.remaining]}>
        <Text style={[styles.legend, styles.alignTextRight]}>Total restante</Text>
        <Text style={[styles.value, styles.alignTextRight]}>
          {formatToBRL(totalRemaining)}
        </Text>
      </View>
    </View>
  );
};

export default Currency;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  valueContainer: {
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    display: "flex"
  },
  spent: {
    flex: 1,
    backgroundColor: COLORS.delete,
  },
  remaining: {
    flex: 1,
    backgroundColor: COLORS.primary50,
  },
  legend: {
    fontSize: 18,
    color: "#fff",
  },
  value: {
    fontSize: 22,
    color: "#fff",
    fontWeight: "bold",
  },
  alignTextRight: {
    textAlign: "right"
  }
});

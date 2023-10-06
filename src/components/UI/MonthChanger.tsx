import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { COLORS } from "../../constants/colors";

const months = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

const MonthChanger = () => {
  const [actualMonth, setActualMonth] = useState(new Date().getMonth());

  const handleChangeMonth = (value: number) => {
    if (actualMonth + value >= months.length) {
      setActualMonth(0);
    } else if (actualMonth + value < 0) {
      setActualMonth(months.length - 1);
    } else {
      setActualMonth((currMonth) => currMonth + value);
    }
  };

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => handleChangeMonth(-1)}
        style={({ pressed }) => [
          styles.iconButton,
          pressed && styles.iconButtonPressed,
        ]}
      >
        <MaterialIcons size={30} color="#fff" name="keyboard-arrow-left" />
      </Pressable>
      <Text style={styles.month}>{months[actualMonth]}</Text>
      <Pressable
        onPress={() => handleChangeMonth(1)}
        style={({ pressed }) => [
          styles.iconButton,
          pressed && styles.iconButtonPressed,
        ]}
      >
        <MaterialIcons color="#fff" name="keyboard-arrow-right" size={30} />
      </Pressable>
    </View>
  );
};

export default MonthChanger;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  iconButton: {
    flex: 1,
    backgroundColor: COLORS.primary50,
    borderRadius: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    elevation: 10,
  },
  iconButtonPressed: {
    elevation: 0,
    backgroundColor: COLORS.primary100
  },
  month: {
    flex: 4,
    fontSize: 20,
    textAlign: "center",
  },
});

import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { COLORS } from "../../constants/colors";
import { ItemContext } from "../../context/ItemContext";
import { ItemContextType } from "../../@types/ItemContextType";
import { queryMonthItems } from "../../services/queryMonthItems";
import { AuthContext } from "../../context/AuthContext";
import { AuthContextType } from "../../@types/AuthContextType";
import Loading from "./Loading";

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

interface MonthChangerProps {
  setLoading?: Dispatch<SetStateAction<boolean>>;
}

const MonthChanger = ({ setLoading }: MonthChangerProps) => {
  const [selectedDate, setSelectedDate] = useState({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });
  const { userFirestoreToken } = useContext(AuthContext) as AuthContextType;
  const { addItems } = useContext(ItemContext) as ItemContextType;

  useEffect(() => {
    async function fetchSelectedMonthItems() {
      if (setLoading) setLoading(true);
      const items = await queryMonthItems(
        userFirestoreToken,
        new Date(selectedDate.year, selectedDate.month + 1, 0)
      );
      addItems(items);
      if (setLoading) setLoading(false);
    }
    fetchSelectedMonthItems();
  }, [selectedDate.month]);

  const handleChangeMonth = (value: number) => {
    if (selectedDate.month + value >= months.length) {
      setSelectedDate((currDate) => {
        return { month: 0, year: currDate.year + 1 };
      });
    } else if (selectedDate.month + value < 0) {
      setSelectedDate((currDate) => {
        return { month: months.length, year: currDate.year - 1 };
      });
    } else {
      setSelectedDate((currDate) => {
        return { month: currDate.month + value, year: currDate.year };
      });
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
      <Text style={styles.month}>
        {months[selectedDate.month]} {selectedDate.year}
      </Text>
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
    backgroundColor: COLORS.primary100,
  },
  month: {
    flex: 4,
    fontSize: 20,
    textAlign: "center",
  },
});

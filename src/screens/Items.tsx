import { useContext, useEffect, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Text,
  ScrollView,
} from "react-native";
import { ItemContext } from "../context/ItemContext";
import { ItemContextType } from "../@types/ItemContextType";
import ItemComponent from "../components/Items/Item";
import ItemFilter from "../components/Items/Filter";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { COLORS } from "../constants/colors";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../@types/NavigationTypes";
import MonthChanger from "../components/UI/MonthChanger";
import { HEIGHT_SCREEN, WIDTH_SCREEN } from "../constants/dimensions";
import { Item } from "../models/Item";
import { sortItemsByData } from "../utils/sortItemsByData";
import { Timestamp } from "firebase/firestore";

const Items = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { items } = useContext(ItemContext) as ItemContextType;
  const [loading, setLoading] = useState(false);
  const [localItems, setLocalItems] = useState<
    { day: string; items: Item[] }[]
  >([]);
  const [currentMonthYear, setCurrentMonthYear] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
  });

  useEffect(() => {
    const sortedItems = sortItemsByData(items);
    const daysInMonth = new Date(
      currentMonthYear.year,
      currentMonthYear.month + 1,
      0
    ).getDate();
    const daysArray = Array.from(
      { length: Math.ceil(daysInMonth) },
      (_, index) => index + 1
    ).reverse();
    const daysItems = [];
    for (let day in daysArray) {
      const itemsOfDay = sortedItems.filter((item) => {
        if (item.data instanceof Timestamp) {
          return item.data.toDate().getDate() === +day;
        } else {
          return item.data.getDate() === +day;
        }
      });
      if (itemsOfDay.length !== 0) {
        const dayItem = {
          day: new Date(
            currentMonthYear.year,
            currentMonthYear.month,
            +day
          ).toLocaleDateString("pt-BR"),
          items: [...itemsOfDay],
        };
        daysItems.unshift(dayItem);
      }
    }
    setLocalItems(daysItems);
  }, [items]);

  return (
    <View style={styles.screen}>
      <ScrollView>
        <MonthChanger setLoading={setLoading} />
        <ItemFilter />
        {loading ? (
          <View>
            <Animated.View style={styles.skeletonItem} />
            <Animated.View style={styles.skeletonItem} />
            <Animated.View style={styles.skeletonItem} />
            <Animated.View style={styles.skeletonItem} />
            <Animated.View style={styles.skeletonItem} />
          </View>
        ) : (
          <>
            {items.length === 0 ? (
              <View style={styles.noItems}>
                <AntDesign
                  name="frowno"
                  size={(WIDTH_SCREEN / 100) * 30}
                  style={styles.noItemsIcon}
                />
                <Text style={styles.noItemsLegend}>
                  Não há itens registrados neste mês
                </Text>
              </View>
            ) : (
              <View style={styles.list}>
                {localItems.map((dayItems) => (
                  <View key={dayItems.day} style={styles.dayComponent}>
                    <Text style={styles.dayLegend}>{dayItems.day}</Text>
                    {dayItems.items.map((item) => (
                      <ItemComponent key={item.id} item={item} />
                    ))}
                  </View>
                ))}
              </View>
            )}
          </>
        )}
      </ScrollView>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("AddItem")}
      >
        <FontAwesome name="plus" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default Items;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingVertical: (HEIGHT_SCREEN / 100) * 0.5,
    paddingHorizontal: (HEIGHT_SCREEN / 100) * 1,
    backgroundColor: "#fff",
  },
  list: {
    marginBottom: 100,
  },
  button: {
    backgroundColor: COLORS.primary100,
    width: (WIDTH_SCREEN / 100) * 15,
    height: (WIDTH_SCREEN / 100) * 15,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: (WIDTH_SCREEN / 100) * 5,
    bottom: (WIDTH_SCREEN / 100) * 5,
    borderRadius: (WIDTH_SCREEN / 100) * 30,
    elevation: 4,
  },
  skeletonItem: {
    backgroundColor: "#eceff1",
    height: (HEIGHT_SCREEN / 100) * 6,
    width: "100%",
    marginVertical: 2,
    marginHorizontal: 5,
  },
  dayComponent: {
    marginVertical: (HEIGHT_SCREEN / 100) * 1,
  },
  dayLegend: {
    fontSize: (WIDTH_SCREEN / 100) * 3.5,
    borderBottomColor: COLORS.borderColor,
    borderBottomWidth: 1,
    padding: (WIDTH_SCREEN / 100) * 1,
    marginBottom: (WIDTH_SCREEN / 100) * 1,
  },
  noItems: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noItemsIcon: {
    marginBottom: (WIDTH_SCREEN / 100) * 5,
    color: "#F2CB05",
  },
  noItemsLegend: {
    fontSize: (WIDTH_SCREEN / 100) * 5,
  },
});

import { useContext } from "react";
import { View, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { ItemContext } from "../context/ItemContext";
import { ItemContextType } from "../@types/ItemContextType";
import Item from "../components/Items/Item";
import ItemFilter from "../components/Items/Filter";
import { FontAwesome } from "@expo/vector-icons";
import { COLORS } from "../constants/colors";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../@types/NavigationTypes";
import MonthChanger from "../components/UI/MonthChanger";

const Items = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const { items } = useContext(ItemContext) as ItemContextType;

  return (
    <View style={styles.list}>
      <MonthChanger />
      <ItemFilter />
      <FlatList
        data={items}
        renderItem={({ item }) => <Item item={item} />}
        keyExtractor={(item) => item.id}
      />
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
  list: {
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: COLORS.primary100,
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: 25,
    bottom: 25,
    borderRadius: 30,
    elevation: 4
  },
});

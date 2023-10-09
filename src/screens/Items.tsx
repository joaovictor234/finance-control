import { useContext, useEffect, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Text,
} from "react-native";
import { ItemContext } from "../context/ItemContext";
import { ItemContextType } from "../@types/ItemContextType";
import Item from "../components/Items/Item";
import ItemFilter from "../components/Items/Filter";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { COLORS } from "../constants/colors";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../@types/NavigationTypes";
import MonthChanger from "../components/UI/MonthChanger";
import { CategoryContext } from "../context/CategoryContext";
import { CategoryContextType } from "../@types/CategoryContextType";
import { doc, updateDoc } from "firebase/firestore";
import { FIREBASE_DB } from "../auth/firebaseConfig";
import { AuthContext } from "../context/AuthContext";
import { AuthContextType } from "../@types/AuthContextType";
import { getMonthDatabase } from "../utils/getMonthDatabase";

const Items = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { userFirestoreToken } = useContext(AuthContext) as AuthContextType;
  const { items } = useContext(ItemContext) as ItemContextType;
  const { categories } = useContext(CategoryContext) as CategoryContextType;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function updateCategories() {
      const userDocRef = doc(FIREBASE_DB, "users", userFirestoreToken);
      await updateDoc(userDocRef, {
        [`data.${getMonthDatabase()}.categories`]: categories,
      });
    }
    updateCategories();
  }, [categories]);

  return (
    <View style={styles.screen}>
      <MonthChanger setLoading={setLoading} />
      <ItemFilter />
      {loading ? (
        <View>
          <Animated.View style={styles.skeletonItem}></Animated.View>
          <Animated.View style={styles.skeletonItem}></Animated.View>
          <Animated.View style={styles.skeletonItem}></Animated.View>
          <Animated.View style={styles.skeletonItem}></Animated.View>
          <Animated.View style={styles.skeletonItem}></Animated.View>
        </View>
      ) : (
        <>
          {items.length === 0 ? (
            <View style={styles.noItems}>
              <AntDesign name="frowno" size={100} style={styles.noItemsIcon} />
              <Text style={styles.noItemsLegend}>
                Não há itens registrados neste mês
              </Text>
            </View>
          ) : (
            <View style={styles.list}>
              <FlatList
                data={items}
                renderItem={({ item }) => <Item item={item} />}
                keyExtractor={(item) => item.id}
              />
            </View>
          )}
        </>
      )}
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
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
  },
  list: {
    marginBottom: 100,
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
    elevation: 4,
  },
  skeletonItem: {
    backgroundColor: "#eceff1",
    height: 50,
    width: "100%",
    marginVertical: 2,
    marginHorizontal: 5,
  },
  noItems: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noItemsIcon: {
    marginBottom: 20,
    color: "#F2CB05",
  },
  noItemsLegend: {
    fontSize: 18,
  },
});

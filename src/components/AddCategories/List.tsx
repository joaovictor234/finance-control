import { useContext, useEffect, useState } from "react";

import AddCategoriesItem from "./Item";
import { CategoryContext } from "../../context/CategoryContext";
import { View, Text, StyleSheet } from "react-native";
import { CategoryContextType } from "../../@types/CategoryContextType";

import Button from "../UI/Button";
import { COLORS } from "../../constants/colors";

import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../@types/NavigationTypes";
import { formatToBRL } from "../../utils/formatToBRL";
import { formatToDecimalString } from "../../utils/formatToDecimalString";
import { doc, updateDoc } from "firebase/firestore";
import { FIREBASE_DB } from "../../auth/firebaseConfig";
import { getMonthDatabase } from "../../utils/getMonthDatabase";
import { AuthContext } from "../../context/AuthContext";
import { AuthContextType } from "../../@types/AuthContextType";
import Loading from "../UI/Loading";
import { HEIGHT_SCREEN } from "../../constants/dimensions";

const AddCategoriesList = () => {
  const { userFirestoreToken } = useContext(AuthContext) as AuthContextType;
  const { categories, calculateTotalPercentage, calculateTotalValue } =
    useContext(CategoryContext) as CategoryContextType;
  const [selectedCategoryCardToEditId, setSelectedCategoryCardToEditId] =
    useState("");
  const [sumPercentagesAndValues, setSumPercentagesAndValues] = useState({
    totalCategoriesPercentages: 0,
    totalCategoriesValues: 0,
  });
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [loading, setLoading] = useState(false);

  const selectCategoryCardToEditHandle = (id: string) => {
    setSelectedCategoryCardToEditId(id);
  };

  const saveCategories = async () => {
    try {
      setLoading(true);
      const userDocRef = doc(FIREBASE_DB, "users", userFirestoreToken);
      await updateDoc(userDocRef, {
        [`data.${getMonthDatabase()}.categories`]: categories,
      });
      navigation.navigate("Main");
    } catch (error) {
      console.log("AddCategoriesList: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setSumPercentagesAndValues({
      totalCategoriesPercentages: calculateTotalPercentage(),
      totalCategoriesValues: calculateTotalValue(),
    });
  }, [categories]);

  return (
    <View style={styles.container}>
      {categories &&
        categories.map((category) => (
          <AddCategoriesItem
            key={category.id}
            category={category}
            idSelectedToEdit={selectedCategoryCardToEditId}
            onSelect={selectCategoryCardToEditHandle}
          />
        ))}
      <View style={styles.total}>
        <Text style={{ flex: 4 }}>Total</Text>
        <Text style={[styles.text, { flex: 5 }]}>
          {formatToBRL(sumPercentagesAndValues.totalCategoriesValues)}
        </Text>
        <Text style={[{ flex: 2, textAlign: "right" }]}>
          {formatToDecimalString(
            sumPercentagesAndValues.totalCategoriesPercentages
          )}
        </Text>
      </View>
      {loading ? (
        <Loading message="Registrando" />
      ) : (
        <Button
          title=""
          onPress={saveCategories}
          disabled={
            !(sumPercentagesAndValues.totalCategoriesPercentages === 100)
          }
        >
          {sumPercentagesAndValues.totalCategoriesPercentages === 100
            ? "FINALIZAR"
            : "A soma das porcentagens deve ser de 100%"}
        </Button>
      )}
    </View>
  );
};

export default AddCategoriesList;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: (HEIGHT_SCREEN / 100) * 1,
  },
  listHeader: {
    paddingTop: (HEIGHT_SCREEN / 100) * 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    textAlign: "center",
  },
  total: {
    borderWidth: 1,
    padding: 5,
    marginTop: 5,
    marginBottom: 10,
    borderRadius: 5,
    borderLeftColor: COLORS.primary100,
    borderLeftWidth: 8,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.secondary50,
  },
});

import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { useContext, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

import { Picker } from "@react-native-picker/picker";
import { CategoryContext } from "../context/CategoryContext";
import { CategoryContextType } from "../@types/CategoryContextType";
import { COLORS } from "../constants/colors";
import { Fonts } from "../constants/fonts";
import Button from "../components/UI/Button";
import Input from "../components/UI/Input";

import { ItemContext } from "../context/ItemContext";
import { ItemContextType } from "../@types/ItemContextType";
import { Item } from "../models/Item";
import { idGenerator } from "../utils/idGenerator";
import { RootStackParamList } from "../@types/NavigationTypes";
import { StackNavigationProp } from "@react-navigation/stack";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

import { Ionicons } from "@expo/vector-icons";
import { Category } from "../models/Category";
import CategoryItem from "../components/Categories/CategoryItem";
import { formatToRawValue } from "../utils/formatToRawValue";
import { formatToBRL } from "../utils/formatToBRL";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { FIREBASE_DB } from "../auth/firebaseConfig";
import Loading from "../components/UI/Loading";
import { getMonthDatabase } from "../utils/getMonthDatabase";
import { MoneyContext } from "../context/MoneyContext";
import { MoneyContextType } from "../@types/MoneyContextType";
import { AuthContext } from "../context/AuthContext";
import { AuthContextType } from "../@types/AuthContextType";
import { HEIGHT_SCREEN, WIDTH_SCREEN } from "../constants/dimensions";

const AddItem = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { userFirestoreToken } = useContext(AuthContext) as AuthContextType;
  const { categories } = useContext(CategoryContext) as CategoryContextType;
  const { addItem } = useContext(ItemContext) as ItemContextType;

  const categoriesList = categories
    .filter((category) => category.name !== "Total")
    .map((category) => category.name);
  const [description, setDescription] = useState("");
  const [selectedCategoryName, setSelectedCategoryName] = useState("");
  const [date, setDate] = useState(new Date());
  const [value, setValue] = useState(0);
  const [isAllDataFilled, setIsAllDataFilled] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [loading, setLoading] = useState(false);

  const changeValueHandler = (value: string) => {
    const numericValue = formatToRawValue(value);
    setValue(numericValue);
  };

  const pickDataHandler = () => {
    DateTimePickerAndroid.open({
      value: date,
      onChange: ({ nativeEvent }) => {
        if (nativeEvent.timestamp) {
          setDate(new Date(nativeEvent.timestamp));
        }
      },
      mode: "date",
    });
  };

  const addNewItem = async () => {
    if (!isAllDataFilled) return;
    setLoading(true);
    const newItem: Item = {
      id: idGenerator(),
      category: selectedCategoryName,
      data: date,
      description: description,
      value: value,
    };
    try {
      const userDocRef = doc(FIREBASE_DB, "users", userFirestoreToken);
      if(getMonthDatabase(date) === getMonthDatabase()) {
        await updateDoc(userDocRef, {
          [`data.${getMonthDatabase()}.items`]: arrayUnion(newItem),
        });
        const updatedCategory = await addItem(newItem);
  
        const updatedCategories = categories.map((c) =>
          c.id === updatedCategory.id ? updatedCategory : c
        );
  
        await updateDoc(userDocRef, {
          [`data.${getMonthDatabase()}.categories`]: updatedCategories,
        });
      } else {
        const userDoc = await getDoc(userDocRef);
        if(userDoc.exists()) {
          const userMonthData = userDoc.data().data[getMonthDatabase(date)];
          if(userMonthData) {

            
          }
        }
      }

      navigation.navigate("Main", { screen: "Items" });
    } catch (error) {
      console.log("AddItem: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (description && selectedCategoryName && value !== 0 && date)
      setIsAllDataFilled(true);
    else setIsAllDataFilled(false);
  }, [description, selectedCategoryName, value]);

  useEffect(() => {
    const [pickedCategory] = categories.filter(
      (category) => category.name === selectedCategoryName
    );
    setSelectedCategory(pickedCategory);
  }, [selectedCategoryName]);

  if (loading) return <Loading message="Adicionando" />;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Descrição</Text>
      <Input value={description} onChangeText={(e) => setDescription(e)} />
      <Text style={styles.label}>Categoria</Text>
      <Picker
        style={styles.select}
        selectedValue={selectedCategoryName}
        onValueChange={(itemValue) => setSelectedCategoryName(itemValue)}
      >
        <Picker.Item label="Selecionar" value="" />
        {categoriesList &&
          categoriesList.map((categoryName) => (
            <Picker.Item
              key={categoryName}
              label={categoryName}
              value={categoryName}
            />
          ))}
      </Picker>
      <CategoryItem category={selectedCategory} />
      <Text style={[styles.label, { marginTop: 10 }]}>Data</Text>
      <View style={styles.pickData}>
        <Text style={styles.date}>
          {new Intl.DateTimeFormat("pt-BR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          }).format(date)}
        </Text>
        <Pressable style={styles.buttonPickDate} onPress={pickDataHandler}>
          <Ionicons
            name="calendar"
            size={24}
            color="black"
            style={styles.buttonPickDateIcon}
          />
        </Pressable>
      </View>
      <Text style={styles.label}>Valor</Text>
      <Input
        value={formatToBRL(value)}
        onChangeText={changeValueHandler}
        keyboardType="numeric"
      />
      <Button title="" onPress={addNewItem} disabled={!isAllDataFilled}>
        ADICIONAR
      </Button>
    </ScrollView>
  );
};

export default AddItem;

const styles = StyleSheet.create({
  container: {
    padding: (HEIGHT_SCREEN / 100) * 1,
    backgroundColor: "#fff",
  },
  label: {
    backgroundColor: "#fff",
    borderRadius: 4,
    paddingVertical: (WIDTH_SCREEN / 100) * 2,
    marginHorizontal: 2,
    fontSize: (WIDTH_SCREEN / 100) * 4,
    paddingHorizontal: (WIDTH_SCREEN / 100) * 5,
    borderLeftColor: COLORS.primary100,
    borderLeftWidth: 10,
    elevation: 4,
  },
  select: {
    backgroundColor: "#fff",
    marginVertical: (WIDTH_SCREEN / 100) * 3,
    marginHorizontal: 2,
    elevation: 4,
    borderWidth: 2,
    borderColor: COLORS.borderColor,
  },
  pickData: {
    display: "flex",
    flexDirection: "row",
  },
  date: {
    flex: 9,
    paddingVertical: (WIDTH_SCREEN / 100) * 3,
    paddingHorizontal: (WIDTH_SCREEN / 100) * 3,
    borderWidth: 1,
    borderRadius: 5,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderRightWidth: 0,
    marginVertical: 10,
    fontSize: (WIDTH_SCREEN / 100) * 5,
    backgroundColor: COLORS.secondary50,
  },
  buttonPickDate: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.primary100,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    marginVertical: 10,
  },
  buttonPickDateIcon: {
    color: COLORS.text,
  },
});

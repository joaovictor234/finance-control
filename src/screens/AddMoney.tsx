import { useEffect, useState, useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "../components/UI/Button";
import Input from "../components/UI/Input";
import { useNavigation } from "@react-navigation/native";
import { MoneyContext } from "../context/MoneyContext";
import { MoneyContextType } from "../@types/MoneyContextType";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../@types/NavigationTypes";
import { formatToBRL } from "../utils/formatToBRL";
import { formatToRawValue } from "../utils/formatToRawValue";
import { doc, updateDoc } from "firebase/firestore";
import { FIREBASE_DB } from "../auth/firebaseConfig";
import { getMonthDatabase } from "../utils/getMonthDatabase";
import { CategoryContext } from "../context/CategoryContext";
import { CategoryContextType } from "../@types/CategoryContextType";
import { ItemContext } from "../context/ItemContext";
import { ItemContextType } from "../@types/ItemContextType";
import { AuthContext } from "../context/AuthContext";
import { AuthContextType } from "../@types/AuthContextType";
import { queryUserFirestoreToken } from "../services/queryUserFirestoreToken";
import Loading from "../components/UI/Loading";

const AddMoney = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { userFirestoreToken } = useContext(AuthContext) as AuthContextType;
  const moneyCtx = useContext(MoneyContext) as MoneyContextType;
  const { items } = useContext(ItemContext) as ItemContextType;
  const { categories } = useContext(CategoryContext) as CategoryContextType;

  const [money, setMoney] = useState(moneyCtx.money);
  const [moneyGreaterThanOne, setMoneyGreaterThanOne] = useState(false);
  const [loading, setLoading] = useState(false);

  const changeMoneyHandler = (value: string) => {
    const BRLMoney = formatToRawValue(value);
    setMoney(BRLMoney);
  };

  const addMoney = async () => {
    try {
      setLoading(true);
      const userDocRef = doc(FIREBASE_DB, "users", userFirestoreToken);
      const monthData = {
        money: money,
        items,
        categories,
      };
      await updateDoc(userDocRef, {
        [`data.${getMonthDatabase()}`]: monthData,
      });
      moneyCtx.addMoney(money);
      navigation.navigate("AddCategories");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const value = money;
    if (value >= 1) setMoneyGreaterThanOne(true);
    else setMoneyGreaterThanOne(false);
  }, [money]);

  return (
    <View style={styles.container}>
      <Text>Quanto você quer adicionar?</Text>
      <Input
        onChangeText={changeMoneyHandler}
        value={formatToBRL(money)}
        keyboardType="decimal-pad"
      />
      {loading ? (
        <Loading message="Registrando" />
      ) : (
        <Button
          onPress={moneyGreaterThanOne ? addMoney : () => {}}
          title=""
          disabled={!moneyGreaterThanOne}
        >
          ADICIONAR
        </Button>
      )}
    </View>
  );
};

export default AddMoney;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 10,
  },
  input: {
    fontSize: 20,
  },
});

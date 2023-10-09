import { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthContext } from "../../context/AuthContext";
import { AuthContextType } from "../../@types/AuthContextType";
import { RootStackParamList } from "../../@types/NavigationTypes";
import Loading from "../UI/Loading";
import Input from "../UI/Input";
import Button from "../UI/Button";
import { COLORS } from "../../constants/colors";

import { FIREBASE_APP, FIREBASE_DB } from "../../auth/firebaseConfig";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { getMonthDatabase } from "../../utils/getMonthDatabase";
import { MoneyContext } from "../../context/MoneyContext";
import { MoneyContextType } from "../../@types/MoneyContextType";
import { CategoryContext } from "../../context/CategoryContext";
import { CategoryContextType } from "../../@types/CategoryContextType";
import { ItemContext } from "../../context/ItemContext";
import { ItemContextType } from "../../@types/ItemContextType";
import { Item } from "../../models/Item";
import { queryUserFirestoreToken } from "../../services/queryUserFirestoreToken";
import { updateUserFirestore } from "../../services/updateUserFirestore";

interface AuthFormProp {
  authType: "login" | "signup";
}

const AuthForm = ({ authType }: AuthFormProp) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const authCtx = useContext(AuthContext) as AuthContextType;
  const { addItems } = useContext(ItemContext) as ItemContextType;
  const { addMoney } = useContext(MoneyContext) as MoneyContextType;
  const { addCategories } = useContext(CategoryContext) as CategoryContextType;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const authHandler = async () => {
    setLoading(true);
    if (authType === "signup") {
      await authCtx.signup(email, password);
      navigation.navigate("AddMoney");
    } else {
      const token = await authCtx.login(email, password);
      try {
        const userFirebaseToken = await queryUserFirestoreToken(token);
        const userRef = doc(FIREBASE_DB, "users", userFirebaseToken);
        const userSnapshot = await getDoc(userRef);
        if (userSnapshot.exists()) {
          if (userSnapshot.data().data[getMonthDatabase()]) {
            const monthData = userSnapshot.data().data[getMonthDatabase()];
            addMoney(monthData.money);
            addCategories(monthData.categories);
            addItems(monthData.items);
            if (monthData.money === 0 || monthData.categories.length === 0) {
              navigation.navigate("AddMoney");
            } else {
              navigation.navigate("Main");
            }
          } else {
            await setDoc(
              userRef,
              {
                [getMonthDatabase()]: {
                  money: 0,
                  categories: [],
                  items: [],
                },
              },
              { merge: true }
            );
            navigation.navigate("AddMoney");
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    setLoading(false);
  };

  /* useEffect(() => {
    setEmail("");
    setPassword("");
  }, [authType]); */

  if (loading)
    return (
      <Loading message={authType === "login" ? "Entrando" : "Registrando"} />
    );

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.label}>Email</Text>
        <Input
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          placeholder="seuemail@email.com"
          autoCapitalize="none"
        />
      </View>
      <View>
        <Text style={styles.label}>Senha</Text>
        <Input
          value={password}
          onChangeText={setPassword}
          placeholder="No mínimo 6 caracteres"
          secureTextEntry={true}
        />
      </View>
      {loading ? (
        <ActivityIndicator size="large" color={COLORS.primary100} />
      ) : (
        <Button title="" onPress={authHandler}>
          {authType === "login" ? "ENTRAR" : "CADASTRAR"}
        </Button>
      )}
    </View>
  );
};

export default AuthForm;

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width * 0.9,
    borderColor: COLORS.borderColor,
    borderWidth: 2,
    borderTopWidth: 0,
    padding: 10,
    borderRadius: 4,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  label: {
    fontSize: 16,
  },
});

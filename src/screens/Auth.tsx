import React, { useContext, useEffect, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import AuthForm from "../components/Auth/Form";
import { AuthContext } from "../context/AuthContext";
import { AuthContextType } from "../@types/AuthContextType";
import Loading from "../components/UI/Loading";
import { COLORS } from "../constants/colors";
import { FIREBASE_DB } from "../auth/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { getMonthDatabase } from "../utils/getMonthDatabase";
import { MoneyContext } from "../context/MoneyContext";
import { MoneyContextType } from "../@types/MoneyContextType";
import { CategoryContext } from "../context/CategoryContext";
import { CategoryContextType } from "../@types/CategoryContextType";
import { ItemContext } from "../context/ItemContext";
import { ItemContextType } from "../@types/ItemContextType";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../@types/NavigationTypes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { queryUserFirestoreToken } from "../services/queryUserFirestoreToken";
import { Item } from "../models/Item";

const Auth = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [isLogin, setIsLogin] = useState(false);
  const { userToken, authenticate } = useContext(
    AuthContext
  ) as AuthContextType;
  const { addMoney } = useContext(MoneyContext) as MoneyContextType;
  const { addCategories } = useContext(CategoryContext) as CategoryContextType;
  const { addItems } = useContext(ItemContext) as ItemContextType;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userToken) {
      async function fetchUserData() {
        try {
          setLoading(true);
          const userFirestoreToken = await queryUserFirestoreToken(userToken);
          const userDocRef = doc(FIREBASE_DB, "users", userFirestoreToken);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            const userData = userDoc.data().data[getMonthDatabase()];
            if (userData) {
              addMoney(userData.money);
              addCategories(userData.categories);
              const items = userData.items.map((item: any) => {
                console.log(item.description + ": " + new Date(item.data.toDate()))
                return {
                  ...item,
                  data: item.data.toDate()
                }
              })
              addItems(items);
              navigation.navigate("Main");
            } else {
              await setDoc(
                userDocRef,
                {
                  [`data.${getMonthDatabase()}`]: {
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
      fetchUserData();
    }
  }, [userToken]);

  useEffect(() => {
    async function fetchLocalToken() {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        authenticate(token);
      }
    }
    fetchLocalToken();
  }, []);

  if (loading) return <Loading message="Entrando" />;

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/logo.png")}
        style={styles.image}
      />
      <Text style={styles.text}>Seja bem-vindo!</Text>
      <View style={styles.form}>
        <View style={styles.operation}>
          <Pressable
            style={[
              styles.operationButton,
              isLogin && styles.operationButtonActive,
            ]}
            onPress={() => setIsLogin(true)}
          >
            <Text style={styles.operationName}>ENTRAR</Text>
          </Pressable>
          <Pressable
            style={[
              styles.operationButton,
              !isLogin && styles.operationButtonActive,
            ]}
            onPress={() => setIsLogin(false)}
          >
            <Text style={styles.operationName}>CADASTRAR</Text>
          </Pressable>
        </View>
        <AuthForm authType={isLogin ? "login" : "signup"} />
      </View>
      <View style={styles.signUp}>
        <Text style={styles.subText}>
          {isLogin ? "Não possui uma conta?" : "Já possui uma conta?"}
        </Text>
        <Pressable
          onPress={() => {
            setIsLogin(!isLogin);
          }}
        >
          <Text style={[styles.subText, styles.link]}>
            {isLogin ? "Faça aqui." : "Entre aqui."}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Auth;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  image: {
    height: 250,
    width: 150,
  },
  text: {
    fontSize: 20,
    marginVertical: 10,
  },
  form: {
    alignItems: "center",
    width: "90%",
    elevation: 4,
  },
  operation: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  operationButton: {
    flex: 1,
    paddingVertical: 15,
    borderColor: COLORS.borderColor,
    borderWidth: 2,
    backgroundColor: "#eee",
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  operationButtonActive: {
    borderBottomWidth: 0,
    backgroundColor: "#fff",
  },
  operationName: {
    textAlign: "center",
    fontSize: 15,
  },
  signUp: {
    display: "flex",
    flexDirection: "row",
    marginTop: 15,
  },
  subText: {
    fontSize: 16,
  },
  link: {
    color: "#168039",
    textDecorationColor: "#168039",
    textDecorationLine: "underline",
    marginLeft: 5,
  },
});

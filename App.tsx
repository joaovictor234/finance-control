import "react-native-gesture-handler";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { RootStackParamList } from "./src/@types/NavigationTypes";

import Main from "./src/screens/Main";
import Auth from "./src/screens/Auth";
import AddMoney from "./src/screens/AddMoney";
import AddCategories from "./src/screens/AddCategories";
import MoneyContextProvider from "./src/context/MoneyContext";
import CategoryContextProvider from "./src/context/CategoryContext";
import AddItem from "./src/screens/AddItem";
import { COLORS } from "./src/constants/colors";
import ItemContextProvider from "./src/context/ItemContext";
import AuthContextProvider from "./src/context/AuthContext";
import { HEIGHT_SCREEN, WIDTH_SCREEN } from "./src/constants/dimensions";
import MonthYearContextProvider from "./src/context/MonthYearContext";

const Stack = createStackNavigator<RootStackParamList>();

const Root = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: COLORS.primary100 },
          headerTintColor: COLORS.text,
          headerTitleStyle: {
            fontSize: (WIDTH_SCREEN / 100) * 5,
          },
        }}
        initialRouteName={"Auth"}
      >
        <Stack.Screen
          name="Auth"
          component={Auth}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={Main}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddMoney"
          component={AddMoney}
          options={{
            title: "Adicionar valor",
          }}
        />
        <Stack.Screen
          name="AddCategories"
          component={AddCategories}
          options={{
            title: "Adicionar categorias",
          }}
        />
        <Stack.Screen
          name="AddItem"
          component={AddItem}
          options={{
            title: "Adicionar item",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <AuthContextProvider>
        <MonthYearContextProvider>
          <MoneyContextProvider>
            <CategoryContextProvider>
              <ItemContextProvider>
                <Root />
              </ItemContextProvider>
            </CategoryContextProvider>
          </MoneyContextProvider>
        </MonthYearContextProvider>
      </AuthContextProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

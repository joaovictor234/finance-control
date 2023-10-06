import React from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "./Home";
import Items from "./Items";
import Categories from "./Categories";
import Options from "./Options";

import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/colors";
import Header from "../components/Home/Header";

const Tab = createBottomTabNavigator();

const Main = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.primary100 },
        headerTintColor: COLORS.text,
        tabBarActiveTintColor: COLORS.primary100,
        headerTitleAlign: "center"
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          header: () => <Header />,
          tabBarIcon: ({ color, size }) => (
            <Ionicons color={color} size={size} name="home" />
          ),
          tabBarLabel: "Home",
        }}
      />
      <Tab.Screen
        name="Items"
        component={Items}
        options={({ navigation }) => ({
          tabBarIcon: ({ color, size }) => (
            <Ionicons color={color} size={size} name="cube" />
          ),
          tabBarLabel: "Itens",
        })}
      />
      <Tab.Screen
        name="Categorias"
        component={Categories}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons color={color} size={size} name="list" />
          ),
          tabBarLabel: "Categorias",
        }}
      />
      <Tab.Screen
        name="Options"
        component={Options}
        options={() => ({
          tabBarLabel: "Opções",
        })}
      />
    </Tab.Navigator>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
});

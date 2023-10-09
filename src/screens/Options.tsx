import { View, Text, StyleSheet } from "react-native";
import Button from "../components/UI/Button";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../@types/NavigationTypes";
import { MaterialIcons } from "@expo/vector-icons";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { AuthContextType } from "../@types/AuthContextType";

const Options = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { logout } = useContext(AuthContext) as AuthContextType;

  const handleLogout = () => {
    logout();
    navigation.navigate("Auth");
  }

  return (
    <View>
      <View style={styles.logout}>
        <Button title="" onPress={handleLogout}>
          SAIR DA CONTA
        </Button>
      </View>
    </View>
  );
};

export default Options;

const styles = StyleSheet.create({
  logout: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
    marginHorizontal: 10,
    justifyContent: "flex-end",
  },
});

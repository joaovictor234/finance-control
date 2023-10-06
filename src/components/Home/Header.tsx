import { View, Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/colors";

const Header = () => {
  return (
    <View style={styles.container}>
      <View style={styles.options}>
        <Ionicons name="menu" size={24} style={styles.icon} />
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primary100,
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 20,
  },
  options: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    padding: 10,
    color: "#fff"
  },
});

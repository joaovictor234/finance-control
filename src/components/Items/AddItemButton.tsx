import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text } from "react-native";

interface IAddItemButton {
  color: string | undefined;
  size: number;
  onPress: () => void;
}

const AddItemButton = ({ color, size, onPress }: IAddItemButton) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
    >
      <Text>Adicionar</Text>
      <Ionicons
        color={color}
        size={size}
        name="add"
        style={styles.addItem}
        onPress={onPress}
      />
    </Pressable>
  );
};

export default AddItemButton;

const styles = StyleSheet.create({
  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 5,
    marginHorizontal: 5,
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  addItem: {
    color: "#000",
  },
  pressed: {
    backgroundColor: "rgba(200,200,200,.5)",
  },
});

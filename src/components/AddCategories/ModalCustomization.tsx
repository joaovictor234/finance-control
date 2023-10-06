import { Ionicons } from "@expo/vector-icons";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { COLORS } from "../../constants/colors";

interface ModalIconsProps {
  elements: string[];
  visible: boolean;
  selectedElement: string;
  customizationType: "color" | "icon";
  onRequestClose: () => void;
  onSelectElement: (
    customizationType: "color" | "icon",
    element: string
  ) => void;
}

const ModalCustomization = ({
  elements,
  visible,
  customizationType,
  selectedElement,
  onRequestClose,
  onSelectElement,
}: ModalIconsProps) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onRequestClose}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerElement}>Selecione o elemento</Text>
          <Ionicons
            name="close"
            size={28}
            style={styles.headerElement}
            onPress={onRequestClose}
          />
        </View>
        <View style={styles.elements}>
          {elements &&
            elements.map((element) => (
              <Pressable
                key={element}
                style={
                  customizationType === "color"
                    ? [
                        styles.color,
                        element === selectedElement && styles.selectedColor,
                        { backgroundColor: element },
                      ]
                    : [
                        styles.icon,
                        element === selectedElement && styles.selectedIcon,
                      ]
                }
                onPress={
                  customizationType === "color"
                    ? () => onSelectElement("color", element)
                    : () => onSelectElement("icon", element)
                }
              >
                {customizationType === "icon" && (
                  <Ionicons name={element} size={28} />
                )}
              </Pressable>
            ))}
        </View>
      </View>
    </Modal>
  );
};

export default ModalCustomization;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    marginTop: 60,
    marginHorizontal: 10,
    borderRadius: 5,
    elevation: 4,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.primary200,
    padding: 10,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  headerElement: {
    color: "#fff",
  },
  elements: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
  },
  icon: {
    borderColor: COLORS.borderColor,
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    margin: 5,
  },
  color: {
    borderRadius: 5,
    padding: 20,
    margin: 5,
  },
  selectedIcon: {
    backgroundColor: "rgba(200,200,200,.5)",
  },
  selectedColor: {
    borderColor: COLORS.borderColor,
    borderWidth: 5,
    padding: 15,
  },
});

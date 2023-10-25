import { Dispatch, SetStateAction } from "react";
import { View, StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";
import Button from "../UI/Button";
import { Fonts } from "../../constants/fonts";

import { SimpleLineIcons, Ionicons } from "@expo/vector-icons";
import { HEIGHT_SCREEN, WIDTH_SCREEN } from "../../constants/dimensions";

interface ICategoriesOptions {
  editMode: boolean;
  setEditMode: Dispatch<SetStateAction<boolean>>;
  onRemoveCategory: () => void;
  onUpdateCategory: () => void;
}

const CategoryOptions = ({
  editMode,
  setEditMode,
  onRemoveCategory,
  onUpdateCategory
}: ICategoriesOptions) => {
  return (
    <View>
      {editMode ? (
        <View style={styles.options}>
          <View style={styles.buttons}>
            <Button title="" color={COLORS.primary50}>
              <Ionicons
                name="ios-arrow-back"
                size={Fonts.text}
                color={COLORS.text}
                onPress={() => setEditMode(false)}
              />
              Retornar
            </Button>
          </View>
          <View style={styles.buttons}>
            <Button
              title=""
              color={COLORS.primary100}
              onPress={onUpdateCategory}
            >
              <SimpleLineIcons
                name="trash"
                size={Fonts.text}
                color={COLORS.text}
              />
              Salvar
            </Button>
          </View>
        </View>
      ) : (
        <View style={styles.options}>
          <View style={styles.buttons}>
            <Button title="" color={COLORS.edit}>
              <SimpleLineIcons
                name="pencil"
                size={Fonts.text}
                color={COLORS.text}
                onPress={() => setEditMode(true)}
              />
              Editar
            </Button>
          </View>
          <View style={styles.buttons}>
            <Button
              title=""
              color={COLORS.delete}
              onPress={onRemoveCategory}
            >
              <SimpleLineIcons
                name="trash"
                size={Fonts.text}
                color={COLORS.text}
              />
              Excluir
            </Button>
          </View>
        </View>
      )}
    </View>
  );
};

export default CategoryOptions;

const styles = StyleSheet.create({
  options: {
    flexDirection: "row",
    paddingHorizontal: WIDTH_SCREEN / 100 * 2,
    paddingVertical: HEIGHT_SCREEN / 100 * 1,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: COLORS.borderColor,
    backgroundColor: COLORS.secondary50,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  buttons: {
    marginHorizontal: 5,
  },
});

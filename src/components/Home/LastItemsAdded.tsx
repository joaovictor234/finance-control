import { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ItemContext } from "../../context/ItemContext";
import { ItemContextType } from "../../@types/ItemContextType";
import ItemComponent from "../Items/Item";
import { COLORS } from "../../constants/colors";
import Button from "../UI/Button";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../@types/NavigationTypes";
import { HEIGHT_SCREEN, WIDTH_SCREEN } from "../../constants/dimensions";

const LastItemsAdded = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { items } = useContext(ItemContext) as ItemContextType;
  const lastFourItemsAdded = items.slice(0, 4);

  const redirectToItemsPage = () => {
    if (lastFourItemsAdded.length === 0) {
      navigation.navigate("AddItem");
    } else {
      navigation.navigate("Main", { screen: "Items" });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Últimos items adicionados</Text>
      <View style={styles.list}>
        {lastFourItemsAdded.length !== 0 ? (
          lastFourItemsAdded.map((item) => (
            <ItemComponent key={item.id} item={item} />
          ))
        ) : (
          <Text style={styles.noItemsLabel}>
            Não foram adicionados nenhum item ainda.
          </Text>
        )}
        <Button title="" onPress={redirectToItemsPage}>
          {lastFourItemsAdded.length !== 0
            ? "Ver mais items"
            : "Adicionar um item"}
        </Button>
      </View>
    </View>
  );
};

export default LastItemsAdded;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: HEIGHT_SCREEN / 100 * 1,
    paddingVertical: HEIGHT_SCREEN / 100 * 1
  },
  label: {
    fontSize: WIDTH_SCREEN / 100 * 4,
    paddingVertical: HEIGHT_SCREEN / 100 * 1
  },
  list: {
    borderColor: COLORS.borderColor,
    borderWidth: 2,
    padding: 5,
    borderRadius: 5,
  },
  noItemsLabel: {
    textAlign: "center",
    fontSize: WIDTH_SCREEN / 100 * 4,
    marginVertical: 10,
  },
});

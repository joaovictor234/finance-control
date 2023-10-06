import { View, StyleSheet } from "react-native";
import InfoView from "../components/Categories/InfoView";
import MonthChanger from "../components/UI/MonthChanger";
import Button from "../components/UI/Button";

const Categories = () => {
  return (
    <View style={styles.screen}>
      <MonthChanger />
      <InfoView />
      <Button title="">Editar</Button>
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
});

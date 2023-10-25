import { ScrollView, StyleSheet } from "react-native";
import Currency from "../components/Home/Currency";
import LastItemsAdded from "../components/Home/LastItemsAdded";
import MonthChanger from "../components/UI/MonthChanger";
import MonthlyOverview from "../components/Home/MonthlyOverview";

const Home = () => {

  return (
    <ScrollView style={styles.screen}>
      <MonthChanger />
      <Currency />
      <LastItemsAdded />
      <MonthlyOverview />
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

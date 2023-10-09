import { StyleSheet, View } from "react-native";
import Currency from "../components/Home/Currency";
import LastItemsAdded from "../components/Home/LastItemsAdded";
import MonthlyOverview from "../components/Home/MonthlyOverview";
import MonthChanger from "../components/UI/MonthChanger";

const Home = () => {
  return (
    <View style={styles.screen}>
      <MonthChanger />
      <Currency />
      <LastItemsAdded />
      {/* <MonthlyOverview /> */}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff"
  }
})
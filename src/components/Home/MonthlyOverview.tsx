import { useContext, useEffect, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { BarChart, LineChart } from "react-native-chart-kit";
import { getDaysInMonth } from "../../utils/getDaysInMonth";
import { ItemContext } from "../../context/ItemContext";
import { ItemContextType } from "../../@types/ItemContextType";
import { useIsFocused } from "@react-navigation/native";
import { HEIGHT_SCREEN } from "../../constants/dimensions";
import { Timestamp } from "firebase/firestore";

const MonthlyOverview = () => {
  const { items } = useContext(ItemContext) as ItemContextType;
  const [daysOfMonth, setDaysOfMonth] = useState<string[]>([]);
  const [daysValue, setDaysValue] = useState<number[]>([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    setDaysValue([]);
    const date = new Date();
    const daysInMonth = getDaysInMonth(
      new Date().getFullYear(),
      date.getMonth()
    );
    setDaysOfMonth(daysInMonth);
    for (let day in daysInMonth) {
      const dayItem = items.filter((item) => {
        if (item.data instanceof Timestamp) {
          return item.data.toDate().getDate() === +day;
        } else {
          return item.data.getDate() === +day;
        }
      });
      const totalDayValue = dayItem.reduce((acc, item) => acc + item.value, 0);
      setDaysValue((currDaysValue) => [...currDaysValue, totalDayValue]);
    }
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <BarChart
        data={{
          labels: daysOfMonth,
          datasets: [
            {
              data: daysValue,
            },
          ],
        }}
        width={Dimensions.get("window").width * 0.95}
        height={(HEIGHT_SCREEN / 100) * 30}
        yAxisLabel="R$ "
        yAxisInterval={1}
        yAxisSuffix=""
        chartConfig={{
          backgroundColor: "#fff",
          backgroundGradientFrom: "#fff",
          backgroundGradientTo: "#fff",
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          barPercentage: 0.2,
          propsForVerticalLabels: {
            fontSize: 10,
          },
        }}
        style={{
          marginVertical: 8,
          borderRadius: 5,
        }}
      />
    </View>
  );
};

export default MonthlyOverview;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: (HEIGHT_SCREEN / 100) * 0.5,
  },
});

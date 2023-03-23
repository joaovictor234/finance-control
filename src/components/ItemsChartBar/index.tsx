import { ChartData } from "chart.js";
import { useContext, useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { ItemContextType } from "../../@types/item";
import { ItemContext } from "../../context/itemContext";
import { getDaysOfMonth } from "../../services/getDaysOfMonth";
import { getMonthAmountSpent } from "../../services/getMonthAmountSpent";

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const days = getDaysOfMonth();

const ItemsChartBar = () => {
  const { items } = useContext(ItemContext) as ItemContextType;
  const [data, setData] = useState<ChartData<"bar", number[], number>>();
  const [amountSpentPerDay, setAmountSpentPerDay] = useState<number[]>([]);

  useEffect(() => {
    setAmountSpentPerDay(getMonthAmountSpent(days, items));
  }, [items.length, items]);

  useEffect(() => {
    if (items && amountSpentPerDay && days) {
      setData({
        labels: days,
        datasets: [{
          label: `Amount spent in ${months[new Date().getMonth()]}`,
          data: amountSpentPerDay
        }]
      })
    }
  }, [items.length, amountSpentPerDay.length, amountSpentPerDay, items]);

  return (
    <div style={{height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      {
        data &&
        <Bar data={data} />
      }
    </div>
  )
}

export default ItemsChartBar;
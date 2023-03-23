import { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import { ChartData, CategoryScale } from "chart.js";
import { Doughnut } from 'react-chartjs-2';
import styles from './goal.module.css';
import { formatMoneyToBRL } from '../../../services/formatMoney';

Chart.register(CategoryScale);

interface IGoal {
  goal: string,
  actualValue: number,
  goalValue: number
}

const Goal = ({ goal, actualValue, goalValue }: IGoal) => {

  const [data, setData] = useState<ChartData<"doughnut", number[], string> | null>(null);
  const [achived, setAchived] = useState(false);

  useEffect(() => {
    setData({
      labels: [
        `actual: ${formatMoneyToBRL(actualValue)}`,
         `goal: ${formatMoneyToBRL(goalValue)}`
      ],
      datasets: [{
        label: goal,
        data: [actualValue, goalValue - actualValue],
        backgroundColor: [
          "rgba(183, 128, 255, .9)",
          "rgba(183, 128, 255, .3)"
        ]
      }]
    })
  }, [actualValue, goal, goalValue])

  useEffect(() => {
    if(actualValue >= goalValue) setAchived(true);
    else setAchived(false);
  }, [actualValue, goalValue])

  return (
    <div className={
      achived ?
      `${styles.achived} ${styles.goal}` :
      styles.goal
    }>
      <p>{goal}</p>
      {
        data &&
        <Doughnut
          width={250}
          height={250}
          data={data} />
      }
    </div>
  )
}

export default Goal;
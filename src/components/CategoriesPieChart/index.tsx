import { useContext, useEffect, useState } from "react";
import Chart from 'chart.js/auto';
import { ChartData, CategoryScale } from "chart.js";
import { Pie } from "react-chartjs-2";
import { CategoryContextType } from "../../@types/category";
import { CategoryContext } from "../../context/categoryContext";
import styles from './categoriespiechart.module.css'

Chart.register(CategoryScale);

const CategoriesPieChart = () => {

  const { categories } = useContext(CategoryContext) as CategoryContextType
  const [data, setData] = useState<ChartData<"pie", number[], string> | null>(null);

  useEffect(() => {
    setData({
      labels: categories.map(category => category.name),
      datasets: [
        {
          label: "Categories",
          data: categories.map(category => category.percentage),
          backgroundColor: [
            "rgba(214, 103, 90, .8)",
            "rgba(255, 143, 76, .8)",
            "rgba(255, 238, 74, .8)",
            "rgba(109, 199, 94, .8)",
            "rgba(92, 168, 218, .8)"
          ]
        }
      ]
    })
  }, [categories])

  return (
    <div className={styles.piechart}>
      {
        data &&
        <Pie
          data={data}
          style={{
            marginLeft: 30,
          }}
          height={350}
          width={350}
          options={{
            plugins: {
              title: {
                display: true,
                text: "Categories"
              }
            }
          }} />
      }
    </div>
  )
}

export default CategoriesPieChart;
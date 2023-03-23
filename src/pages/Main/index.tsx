import CategoriesPieChart from "../../components/CategoriesPieChart";
import Goals from "../../components/Goals";
import { Header } from "../../components/Header";
import ItemsChartBar from "../../components/ItemsChartBar";
import { Menu } from "../../components/Menu";
import { Items } from "../Items";
import { Table } from "../Table";
import styles from './main.module.css';

export const Main = () => {
  return (
    <div className={styles.home}>
      <Menu />
      <main>
        <Header />
        <div className={styles.content}>
          <Items />
          <div className={styles.general_information}>
            <div className={styles.categories_data}>
              <Table />
              <CategoriesPieChart />
            </div>
            <div>
              <ItemsChartBar />
            </div>
          </div>
          <Goals />
        </div>
      </main>
    </div>
  )
}
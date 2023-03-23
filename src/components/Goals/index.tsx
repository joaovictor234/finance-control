import Goal from "./Goal"
import styles from './goals.module.css';

const Goals = () => {
  return (
    <div className={styles.list}>
      <h3>Goals</h3>
      <Goal
        goal="Viagem"
        actualValue={2000}
        goalValue={10000} />
      <Goal
        goal="Apartamento"
        actualValue={10000}
        goalValue={20000} />
      <Goal
        goal="Carro"
        actualValue={30000}
        goalValue={100000} />
      <Goal
        goal="Aniversário"
        actualValue={5000}
        goalValue={5000} />
    </div>
  )
}

export default Goals
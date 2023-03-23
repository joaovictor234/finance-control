import styles from './menu.module.css';

export const Menu = () => {
  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        <li className={styles.item}>
          <i className="fa-solid fa-user-astronaut"></i>
          User
        </li>
        <li className={styles.item}>
          <i className="fa-solid fa-house"></i>
          Home
        </li>
        <li className={styles.item}>
          <i className="fa-solid fa-boxes-stacked"></i>
          Items
        </li>
        <li className={styles.item}>
          <i className="fa-solid fa-gear"></i>
          Settings
        </li>
        <li className={styles.item}>
          <i className={`${styles.rotate_icon} fa-solid fa-right-from-bracket`}></i>
          Log out
        </li>
      </ul>
    </div>
  )
}
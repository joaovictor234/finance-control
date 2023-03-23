import styles from './header.module.css';

export const Header = () => {

  return (
    <div className={styles.container}>
      <h1>Overview</h1>
      <div className={styles.profile}>
        <div className={styles.search}>
          <p>Search</p>
          <i className="fa-solid fa-magnifying-glass"></i>
        </div>
        <i className="fa-solid fa-bell"></i>
        <div className={styles.user}>
          <div>
            <i className="fa-solid fa-user"></i>
          </div>
          <p>Standard User</p>
          <i className="fa-solid fa-angle-down"></i>
        </div>
      </div>
    </div>
  )
}
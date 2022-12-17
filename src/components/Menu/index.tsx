import { Link } from "react-router-dom"
import './menu.css';

export const Menu = () => {
  return (
    <div className="menu--container">
      <ul className="menu--list">
        <Link to="/" className="menu--link">
          <li className="menu--item">
            <i className="fa-solid fa-house menu--icon" />
            Main
          </li>
        </Link>
        <Link to="/add-money" className="menu--link">
          <li className="menu--item">
            <i className="fa-solid fa-money-bill menu--icon"></i>
            Add Money
          </li>
        </Link>
        <Link to="/add-categories" className="menu--link">
          <li className="menu--item">
            <i className="fa-solid fa-boxes-stacked menu--icon" />
            Add Categories
          </li>
        </Link>
        <Link to="/items" className="menu--link">
          <li className="menu--item">
            <i className="fa-solid fa-box menu--icon"></i>
            Items
          </li>
        </Link>
        <Link to="/table" className="menu--link">
          <li className="menu--item">
            <i className="fa-solid fa-table menu--icon"></i>
            Table
          </li>
        </Link>
      </ul>
    </div>
  )
}
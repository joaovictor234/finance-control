import { Link } from "react-router-dom"
import { Header } from "../../components/Header";
import './main.css';

export const Main = () => {
  return (
    <main>
      <Header pageTitle="Main Page"/>
      <p>Finance Control</p>
      <Link to='/add-money'>
        <button className="main--button">Create a new Finance Control</button>
      </Link>
    </main>  
  )
}
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { AddCategories } from "../pages/Categories"
import { AddMoney } from "../pages/AddMoney"
import { Items } from "../pages/Items"
import { Main } from "../pages/Main"
import { Table } from "../pages/Table"

export const MainRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/add-money" element={<AddMoney/>}/>
        <Route path="/add-categories" element={<AddCategories/>}/>
        <Route path="/items" element={<Items/>}/>
        <Route path="/table" element={<Table/>}/>
      </Routes>
    </BrowserRouter>
  )
}
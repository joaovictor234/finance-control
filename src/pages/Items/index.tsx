import { Header } from "../../components/Header"
import { ItemForm } from "./Form"
import { ListItems } from "./List"
import { ItemsTable } from "./Table"

export const Items = () => {

  return (
    <div>
      <Header pageTitle="Items"/>
      <ItemsTable/>
      <ListItems/>
      <ItemForm/>
    </div>
  )
}
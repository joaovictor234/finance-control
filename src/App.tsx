import './App.css';
import CategoryProvider from './context/categoryContext';
import ItemProvider from './context/itemContext';
import MoneyProvider from './context/moneyContext';
import { MainRouter } from './routes/root';

function App() {
  return (
    <div className="App">
      <MoneyProvider>
        <CategoryProvider>
          <ItemProvider>
            <MainRouter/>
          </ItemProvider>
        </CategoryProvider>
      </MoneyProvider>
    </div>
  );
}

export default App;
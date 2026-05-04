import Header from "./Component/header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Introduction from "./Component/Introduction";
import LoginPage from "./Component/LoginPage";
import Dashboard from "../src/Container/Dashboard"
import { AddExpense } from "./Container/addExpense";
import { Settings } from "./Container/settings";
import Analytics from "./Container/Analytics";
import { initialBudgetData } from './utils/data'
  


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Introduction/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/about" element={<h1>About Page</h1>} />
        <Route path="/test" element={<Header />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/addExpense" element={<AddExpense></AddExpense>}/>
        <Route path="/settings" element={<Settings></Settings>}/>
        <Route path="/settings" element={<Settings />} />
  <Route path="/analytics" element={<Analytics />} />
      
      </Routes>
    </BrowserRouter>
  );
}

export default App;
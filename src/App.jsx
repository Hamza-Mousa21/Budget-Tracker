import Header from "./Component/header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Introduction from "./Component/Introduction";
import LoginPage from "./Component/LoginPage";
import Dashboard from "../src/Container/Dashboard"
import { AddExpense } from "./Container/addExpense";

  


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
   
      </Routes>
    </BrowserRouter>
  );
}

export default App;
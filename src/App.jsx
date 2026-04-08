import Header from "./Component/header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Introduction from "./Component/Introduction";
import Dashboard from "./Container/Dashboard";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Introduction />} />
        <Route path="/about" element={<h1>About Page</h1>} />
        <Route path="/test" element={<Header />} />
        <Route path="/dashboard" element={<Dashboard />} />
   
      </Routes>
    </BrowserRouter>
  );
}

export default App;
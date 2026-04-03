import Header from "./Component/header"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Introduction from "./Component/Introduction";
function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Introduction/>} />
        <Route path="/about" element={<h1>About Page</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App

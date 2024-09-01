import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserInfo from "./pages/AddUserInfo";
import BooksListing from "./pages/BooksListing";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserInfo />} />
        <Route path="/bookslisting" element={<BooksListing/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

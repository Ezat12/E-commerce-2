import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Components/Pages/Home";
import Navbar from "./Navbar/Navbar.jsx";
import SignupOrLogin from "./Components/Pages/SignupOrLogin.jsx";
import Card from "./Components/Pages/Card.jsx";
import Profile from "./Components/Pages/Profile.jsx";
import { Toaster } from "react-hot-toast";
import AddProduct from "./Components/Pages/AddProduct.jsx";
import { ToastContainer} from "react-toastify";


function App() {
  return (
    <div>
      <Toaster />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signuplogin" element={<SignupOrLogin />} />
        <Route path="/card" element={<Card />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/add-product" element={<AddProduct />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;

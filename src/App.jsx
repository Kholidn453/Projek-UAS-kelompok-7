import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Home from "./pages/home/home";
import Login from "./pages/login/login";
import SignUp from "./pages/signup/signup";
import Product from "./pages/product/product";
import Category from "./pages/category/category";
import NavigationBar from "./components/Navbar";
import AkunSaya from "./pages/akun/AkunSaya";
import Keranjang from "./pages/keranjang/Keranjang";
import ProfilForm from "./pages/akun/ProfilForm";
import AlamatForm from "./pages/akun/AlamatForm";
import UbahPasswordForm from "./pages/akun/UbahPasswordForm";
import HapusAkun from "./pages/akun/HapusAkun";
import { CartProvider } from "./context/CartContext";
import "./App.css";

function LayoutWithNavbar({ user, setUser }) {
  const location = useLocation();
  const hideNavbarPaths = ["/login", "/signup"];
  const shouldHideNavbar = hideNavbarPaths.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbar && (
        <NavigationBar user={user} setUser={setUser} />
      )}
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/home" element={<Home user={user} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/category" element={<Category />} />
        <Route path="/product" element={<Product />} />
        <Route path="/akun" element={<AkunSaya />} />
        <Route path="/akun/profil" element={<ProfilForm />} />
        <Route path="/akun/alamat" element={<AlamatForm />} />
        <Route path="/akun/ubah-password" element={<UbahPasswordForm />} />
        <Route path="/akun/hapus-akun" element={<HapusAkun />} />
        <Route path="/keranjang" element={<Keranjang />} />
      </Routes>
    </>
  );
}

function App() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  return (
    <CartProvider>
      <Router>
        <LayoutWithNavbar user={user} setUser={setUser} />
      </Router>
    </CartProvider>
  );
}

export default App;

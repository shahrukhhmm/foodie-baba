import React, { useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Admin from "./components/Admin/Admin";
import Cart from "./components/cart/Cart";
import { CartProvider } from "./components/cart/CartContext";
import Catern from "./components/caterin/catern";
import Deliverypartner from "./components/caterin/deliverypartner";
import Micro from "./components/caterin/Micro";
import Pickupform from "./components/caterin/pickupform";
import Contact from "./components/components/Contact";
import Login from "./components/components/Login";
import SignUp from "./components/components/Singup";
import About from "./components/components2/About";
import FeedBack from "./components/components2/FeedBack";
import Privacy from "./components/components2/Privacy";
import Terms from "./components/components2/Terms";
import Deals from "./components/Deals/deals";
import Footer from "./components/footer";
import Header from "./components/header";
import Home from "./components/Home/Home";
import Menu from "./components/Menu/Menu";
import Order from "./components/order";
import { Navigate } from "react-router-dom";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const navigate = useNavigate();
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <CartProvider>
      <Router>
        <div className="scrollbar-thin scrollbar-track-orange-400 scrollbar-thumb-red-600 overflow-y-scroll h-screen">
          <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/deals" element={<Deals />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/about" element={<About />} />
            <Route path="/feedback" element={<FeedBack />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/order" element={<Order />} />
            <Route path="/caterin" element={<Catern />} />
            <Route path="/pickup" element={<Pickupform />} />
            <Route path="/Micro" element={<Micro />} />
            <Route path="/delievrypartner" element={<Deliverypartner />} />
            <Route
              path="/admin"
              element={
                localStorage.getItem("admin") === "true" ? (
                  <Admin />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
          </Routes>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
};

export default App;

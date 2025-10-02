import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import ProductDetail from "./pages/ProductDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Auth from "./pages/Auth";
import Information from "./pages/Information";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ChangePassword from "./pages/ChangePassword";
import MainUserLayout from "./pages/MainUserLayout";
import Order from "./pages/Order";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800 container mx-auto px-4 py-6 max-w-7xl">
      <ToastContainer position="top-right" autoClose={2000} />
      <Header />
      <div className="mt-30">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/auth" element={<Auth />} />
          <Route element={<MainUserLayout />}>
            <Route path="/information" element={<Information />} />
            <Route path="/change-password" element={<ChangePassword />} />
          </Route>
          <Route path="/order" element={<Order />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;

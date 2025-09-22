import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import ProductDetail from "./pages/ProductDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";

const App = () => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800 container mx-auto px-4 py-6 max-w-7xl">
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/collection" element={<Collection />} />
                <Route path="/product/:productId" element={<ProductDetail />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
            </Routes>
            <Footer />
        </div>
    );
};

export default App;

import React from "react";
import { Route, Routes } from "react-router-dom";
import AddAuth from "./pages/AddAuth";
import AddProducts from "./pages/AddProducts";
import AllAuth from "./pages/AllAuth";
import AllOrders from "./pages/AllOrders";
import AllProducts from "./pages/AllProducts";
import MainLayout from "./MainLayout";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductsChart from "./pages/ProductsChart";
import AccountsChart from "./pages/AccountsChart";
import OrdersChart from "./pages/OrdersChart";

const App = () => {
  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />
      <Routes>
        {/* Trang login không dùng layout */}
        <Route path="/" element={<Login />} />

        {/* Các route bên trong layout */}
        <Route element={<MainLayout />}>
          <Route path="/addAuth" element={<AddAuth />} />
          <Route path="/addProducts" element={<AddProducts />} />
          <Route path="/allAuth" element={<AllAuth />} />
          <Route path="/allOrders" element={<AllOrders />} />
          <Route path="/allProducts" element={<AllProducts />} />
          <Route path="/productsChart" element={<ProductsChart />} />
          <Route path="/accountsChart" element={<AccountsChart />} />
          <Route path="/ordersChart" element={<OrdersChart />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;

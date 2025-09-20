import React from "react";
import Layout from "./components/layout/Layout";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Header from "./components/common/Header";
import DashboardLayout from "./components/common/DashboardLayout";
import OrderList from "./pages/OrderList";

function App() {
  return (
    <div className="  ">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<Dashboard />} />
          <Route path="ecommerce/orders" element={<OrderList />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

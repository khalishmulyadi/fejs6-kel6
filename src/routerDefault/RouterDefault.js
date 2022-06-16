import React from "react";
import { Routes, Route } from "react-router-dom";
import DetailProduk from "../components/DetailProduk/DetailProduk";

const RouterDefault = () => {
  return (
    <Routes>
      <Route path="/" />
      <Route path="product/product-detail" element={<DetailProduk role="customer" />} />
      <Route path="product/product-preview" element={<DetailProduk role="merchant" />} />
    </Routes>
  );
};

export default RouterDefault;

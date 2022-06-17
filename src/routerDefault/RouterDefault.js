import React from "react";
import { Route, Routes } from "react-router-dom";
import CardProduct from "../components/CardProduct/CardProduct";
import DetailProduk from "../components/DetailProduk/DetailProduk";

const RouterDefault = () => {
  return (
    <Routes>
      <Route path="/" />
      <Route path="product/product-detail" element={<DetailProduk role="customer" />} />
      <Route path="product/product-preview" element={<DetailProduk role="merchant" />} />
      <Route path="product-card" element={<CardProduct />} />
    </Routes>
  );
};

export default RouterDefault;

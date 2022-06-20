import React from "react";
import { Route, Routes } from "react-router-dom";
import CardProduct from "../components/CardProduct/CardProduct";
import DetailProduk from "../components/DetailProduk/DetailProduk";
import FormLogin from "../components/FormLogin/FormLogin";
import { ModalDefault } from "../components/Modal/ModalDefault";
import { InfoProduct } from "../Pages/InfoProduct/InfoProduct";

const RouterDefault = () => {
  return (
    <Routes>
      <Route path="/" element={<FormLogin/>}/>
      <Route path="product/product-detail" element={<DetailProduk role="customer" />} />
      <Route path="product/product-preview" element={<DetailProduk role="merchant" />} />
      <Route path="product-card" element={<CardProduct />} />
      <Route path="infoproduct" element={<InfoProduct/>} />
      <Route path="modal" element={<ModalDefault/>} />

    </Routes>
  );
};

export default RouterDefault;

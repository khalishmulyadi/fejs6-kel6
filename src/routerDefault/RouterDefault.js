import React from "react";
import { Route, Routes } from "react-router-dom";
import CardProduct from "../components/CardProduct/CardProduct";
import DetailProduk from "../components/DetailProduk/DetailProduk";
import FormLogin from "../components/FormLogin/FormLogin";
import { ModalDefault } from "../components/Modal/ModalDefault";
import { InfoProduct } from "../Pages/InfoProduct/InfoProduct";

import { InfoProfil } from "../components/InfoProfil/InfoProfil";

import Tambah from "../components/TambahProduk/Tambah";
import HomePage from "../Pages/HomePage/HomePage";


const RouterDefault = () => {
  return (
    <Routes>
      <Route path="/" element={<FormLogin/>}/>
      <Route path="product/product-detail" element={<DetailProduk role="customer" />} />
      <Route path="product/product-preview" element={<DetailProduk role="merchant" />} />
      <Route path="product-card" element={<CardProduct />} />
      <Route path="homepage" element={<HomePage />} />
      <Route path="infoproduct" element={<InfoProduct/>} />

      <Route path="infoprofil" element={<InfoProfil />} />

      <Route path="tambah-product" element={<Tambah />} />
        
    </Routes>
  );
};

export default RouterDefault;

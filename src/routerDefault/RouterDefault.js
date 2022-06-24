import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CardProduct from "../components/CardProduct/CardProduct";
import DetailProduk from "../components/DetailProduk/DetailProduk";
import FormLogin from "../components/FormLogin/FormLogin";
import { InfoProduct } from "../Pages/InfoProduct/InfoProduct";
import { FormRegistrasi } from "../components/FormRegistrasi/FormRegistrasi";
import { InfoProfil } from "../components/InfoProfil/InfoProfil";

import Tambah from "../components/TambahProduk/Tambah";
import NotifPageMobile from "../components/NotifPageMobile/NotifPageMobile";

const RouterDefault = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="auth/login" element={<FormLogin />} />
        <Route path="auth/registrasi" element={<FormRegistrasi />} />
        <Route path="product/product-detail" element={<DetailProduk role="customer" />} />
        <Route path="product/product-preview" element={<DetailProduk role="merchant" />} />
        <Route path="product-card" element={<CardProduct />} />

        <Route path="infoproduct" element={<InfoProduct />} />

        <Route path="edit-profile" element={<InfoProfil />} />

        <Route path="tambah-product" element={<Tambah />} />

        <Route path="notifikasi" element={<NotifPageMobile />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouterDefault;

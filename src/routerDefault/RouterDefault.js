import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CardProduct from "../components/CardProduct/CardProduct";
import { InfoProduct } from "../Pages/InfoProduct/InfoProduct";
import { InfoProfil } from "../components/InfoProfil/InfoProfil";

import Tambah from "../components/TambahProduk/Tambah";

import NotifPageMobile from "../components/NotifPageMobile/NotifPageMobile";
import AkunSayaMobile from "../components/AkunSayaMobile/AkunSayaMobile";
import DetailProduct from "../Pages/DetailProduct/DetailProduct";
import PreviewProduct from "../Pages/PreviewProduct/PreviewProduct";
import LoginPage from "../Pages/LoginPage/LoginPage";
import RegistrationPage from "../Pages/RegistrationPage/RegistrationPage";
import DaftarJualSaya from "../Pages/DaftarJualSaya/DaftarJualSaya";
import DaftarBeliSaya from "../Pages/DaftarBeliSaya/DaftarBeliSaya";

const RouterDefault = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="auth/login" element={<LoginPage />} />
        <Route path="auth/registrasi" element={<RegistrationPage />} />
        <Route path="product/product-detail" element={<DetailProduct />} />
        <Route path="product/product-preview" element={<PreviewProduct />} />
        <Route path="product-card" element={<CardProduct />} />

        <Route path="infoproduct" element={<InfoProduct />} />

        <Route path="edit-profile" element={<InfoProfil />} />

        <Route path="tambah-product" element={<Tambah />} />

        <Route path="notifikasi" element={<NotifPageMobile />} />
        <Route path="akun-saya" element={<AkunSayaMobile />} />

        <Route path="daftar-jual" element={<DaftarJualSaya />} />
        <Route path="daftar-beli" element={<DaftarBeliSaya />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouterDefault;

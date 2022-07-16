import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Tambah from "../components/TambahProduk/Tambah";
import HomePage from "../Pages/HomePage/HomePage";

import UpdateProfilePage from "../Pages/UpdateProfilePage/UpdateProfilePage";
import NotifPageMobile from "../components/NotifPageMobile/NotifPageMobile";
import AkunSayaMobile from "../components/AkunSayaMobile/AkunSayaMobile";
import DetailProduct from "../Pages/DetailProduct/DetailProduct";
import PreviewProduct from "../Pages/PreviewProduct/PreviewProduct";
import LoginPage from "../Pages/LoginPage/LoginPage";
import RegistrationPage from "../Pages/RegistrationPage/RegistrationPage";
import DaftarJualSaya from "../Pages/DaftarJualSaya/DaftarJualSaya";
import DaftarBeliSaya from "../Pages/DaftarBeliSaya/DaftarBeliSaya";
import InfoProduct from "../Pages/InfoProduct/InfoProduct"
import ProtectedRoutes from "./ProtectedRoutes";

const RouterDefault = (props) => {
  return (
    <BrowserRouter>
      {console.log("status login", props.loginStatus)}
      <Routes>
        <Route path="auth/login" element={<LoginPage />} />
        <Route path="auth/registrasi" element={<RegistrationPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="product/product-detail/p/:idBarang" element={<DetailProduct pengguna="customer" />} />

        <Route element={<ProtectedRoutes />}>
          <Route path="homepage" element={<HomePage />} />

          <Route path="product/product-detail/:idBarang" element={<DetailProduct pengguna="customer" />} />
          <Route path="product/my-product/:idBarang" element={<DetailProduct pengguna="merchant" />} />

          <Route path="product/product-preview" element={<PreviewProduct />} />
          <Route path="infoproduct" element={<InfoProduct />} />
          <Route path="infoproduct/:idBarangBid" element={<InfoProduct />} />

          <Route path="update-profile" element={<UpdateProfilePage />} />

          <Route path="tambah-product" element={<Tambah />} />

          <Route path="notifikasi" element={<NotifPageMobile />} />
          <Route path="akun-saya" element={<AkunSayaMobile />} />

          <Route path="daftar-jual" element={<DaftarJualSaya />} />
          <Route path="daftar-beli" element={<DaftarBeliSaya />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RouterDefault;

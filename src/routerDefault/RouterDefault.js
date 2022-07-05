import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CardProduct from "../components/CardProduct/CardProduct";
import { InfoProduct } from "../Pages/InfoProduct/InfoProduct";

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
import ProtectedRoutes from "./ProtectedRoutes";
import getUserDetail from "../redux/actions/getUserDetail";
import { connect } from "react-redux";

const RouterDefault = (props) => {
  // useEffect(() => {
  //   async function getUserDetail() {
  //     await props.getUserDetail();
  //   }
  //   getUserDetail();
  // }, []);

  return (
    <BrowserRouter>
      {console.log("status login", props.loginStatus)}
      <Routes>
        <Route path="auth/login" element={<LoginPage />} />
        <Route path="auth/registrasi" element={<RegistrationPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="product/product-detail" element={<DetailProduct />} />

        <Route element={<ProtectedRoutes />}>
          <Route path="homepage" element={<HomePage />} />
          <Route path="product/product-preview" element={<PreviewProduct />} />
          <Route path="infoproduct" element={<InfoProduct />} />

          <Route path="update-profile" element={<UpdateProfilePage />} />

          <Route path="tambah-product" element={<Tambah />} />

          <Route path="notifikasi" element={<NotifPageMobile />} />
          <Route path="akun-saya" element={<AkunSayaMobile />} />

          <Route path="daftar-jual" element={<DaftarJualSaya />} />
          <Route path="daftar-beli" element={<DaftarBeliSaya />} />
        </Route>
        <Route path="product-card" element={<CardProduct />} />
      </Routes>
    </BrowserRouter>
  );
};

const mapStateToProps = (state) => {
  return {
    loginStatus: state.userReducer.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserDetail: () => dispatch(getUserDetail()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RouterDefault);

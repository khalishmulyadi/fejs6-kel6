import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import setLoginStatus from "../../redux/actions/setLoginStatus";
import authService from "../../services/auth.service";
import { useNavigate, useParams } from "react-router-dom";

import Notifikasi from "../Nofitikasi/Notifikasi";
import NotifikasiBuyer from "../NotifikasiBuyer/NotifikasiBuyer";

const NavbarDesktop = (props) => {
  var axios = require("axios");
  const [Token, setToken] = useState(JSON.parse(window.sessionStorage.getItem("user")));

  const [DataNotif, setDataNotif] = useState([]);
  const { idBarang } = useParams();

  const navigate = useNavigate();
  const handleLogout = () => {
    authService.logout();
    window.location.replace("/auth/login");
  };

  const handleGetNotif = () => {
    if (props.roleUser === 1) {
      var config = {
        method: "get",
        url: `https://asix-store.herokuapp.com/user/notifikasi-buyer/${props.userId}/Bidding`,
        headers: {
          Authorization: `Bearer ${Token.access_token}`,
        },
      };

      axios(config)
        .then(function (response) {
          setDataNotif(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else if (props.roleUser === 2) {
      var config2 = {
        method: "get",
        url: `https://asix-store.herokuapp.com/user/notifikasi-seller/${props.userId}/Bidding`,
        headers: {
          Authorization: `Bearer ${Token.access_token}`,
        },
      };

      axios(config2)
        .then(function (response) {
          setDataNotif(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const handleMapDataNotifSeller = () => {
    return DataNotif.map((value, index) => {
      return (
        <a className="dropdown-item px-4" href={`infoproduct/${value.barangId}`} key={index}>
          <Notifikasi namaProduk={value.namaBarang} harga={value.hargaBarang} hargaTawar={value.hargaTawar} date={value.tanggalTawar} img={value.gambarBarang} key={index} />
        </a>
      );
    });
  };

  const handleMapDataNotifBuyer = () => {
    return DataNotif.map((value, index) => {
      return (
        <a className="dropdown-item px-4" href={`infoproduct/${value.barangId}`} key={index}>
          <NotifikasiBuyer namaProduk={value.namaBarang} harga={value.hargaBarang} hargaTawar={value.hargaTawar} date={value.tanggalTawar} img={value.gambarBarang} key={index} />
        </a>
      );
    });
  };

  const handleNotifSellerAndBUyer = () => {
    // Buyer
    if (props.roleUser === 1) {
      return DataNotif.map((value, index) => {
        return (
          <a className="dropdown-item px-4" href={`product/product-detail/${value.barangId}`} key={index}>
            <NotifikasiBuyer namaProduk={value.namaBarang} harga={value.hargaAkhir} hargaTawar={value.hargaTawar} date={value.tanggalTransaksi} img={value.gambarBarang} key={index} />
          </a>
        );
      });
    }
    // Seller
    else if (props.roleUser === 2) {
      return DataNotif.map((value, index) => {
        return (
          <a className="dropdown-item px-4" href={`infoproduct/${value.barangId}`} key={index}>
            <Notifikasi namaProduk={value.namaBarang} harga={value.hargaBarang} hargaTawar={value.hargaTawar} date={value.tanggalTawar} img={value.gambarBarang} key={index} />
          </a>
        );
      });
    }
  };

  return (
    <div className="container-fluid container__nav">
      <div className="container ">
        <nav>
          {props.loginStatus ? (
            <a href="/homepage">
              <label className="logo__nav">AsiX Store</label>
            </a>
          ) : (
            <a href="/">
              <label className="logo__nav">AsiX Store</label>
            </a>
          )}
          <div className="button__nav">
            {props.loginStatus ? (
              <div className="button__nav">
                <div className="btn-group drop_menu">
                  {props.roleUser === 1 ? (
                    <button type="button" className="btn mt-3 dropdown-toggle menu_user">
                      <a href="/daftar-beli">
                        <i className="bi bi-list-ul bi__nav"></i>
                      </a>
                    </button>
                  ) : (
                    <button type="button" className="btn mt-3 dropdown-toggle menu_user">
                      <a href="/daftar-jual">
                        <i className="bi bi-list-ul bi__nav"></i>
                      </a>
                    </button>
                  )}
                </div>

                <div className="btn-group drop_notif">
                  <button type="button" className="btn mt-3 dropdown-toggle notifikasi_user" data-bs-toggle="dropdown" aria-expanded="false" onClick={handleGetNotif}>
                    <i className="bi bi-bell bi__nav"></i>
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>{handleNotifSellerAndBUyer()}</li>
                  </ul>
                </div>

                <div className="btn-group drop_profile">
                  <button type="button" className="btn mt-3 dropdown-toggle profile_user" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="bi bi-person bi__nav"></i>
                  </button>

                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <a className="dropdown-item" href="/update-profile">
                        Ubah Akun
                      </a>
                    </li>
                    <li>
                      <button className="dropdown-item" onClick={handleLogout}>
                        Keluar
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="button__nav">
                <a type="button" className="btn button_login mt-3" href="/auth/login">
                  <span className="me-2">
                    <i className="bi bi-box-arrow-in-right"></i>
                  </span>
                  Masuk
                </a>
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loginStatus: state.userReducer.isLoggedIn,
    userId: state.userReducer.idUser,
    dataUser: state.userReducer.dataUser,
    roleUser: state.userReducer.role,
  };
};

export default connect(mapStateToProps)(NavbarDesktop);

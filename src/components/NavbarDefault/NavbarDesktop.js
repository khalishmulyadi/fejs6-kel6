import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import setLoginStatus from "../../redux/actions/setLoginStatus";
import authService from "../../services/auth.service";
import { useNavigate, useParams } from "react-router-dom";

import Notifikasi from "../Nofitikasi/Notifikasi";

const NavbarDesktop = (props) => {
  var axios = require('axios');
  const [Token, setToken] = useState(JSON.parse(window.sessionStorage.getItem('user')));
  const [DataNotif, setDataNotif] = useState([]);
  const { idBarang } = useParams();

  const navigate = useNavigate();
  const handleLogout = () => {
    authService.logout();
    window.location.replace("/auth/login");
  };

  const handleGetNotif = () => {
    var config = {
      method: 'get',
      url: `https://asix-store.herokuapp.com/user/notifikasi-seller/${props.userId}/Bidding`,
      headers: {
        'Authorization': `Bearer ${Token.access_token}`
      }
    };

    axios(config)
      .then(function (response) {
        setDataNotif(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleMapDataNotif = () => {
    return DataNotif.map((value, index) => {
      return <a className="dropdown-item px-4" href={`infoproduct/${value.barangId}`} key={index}>
        <Notifikasi
          namaProduk={value.namaBarang}
          harga={value.hargaBarang}
          hargaTawar={value.hargaTawar}
          date={value.tanggalTawar}
          img={value.gambarBarang}
          key={index}
        />
      </a>
    })
  }


  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-3 mt-3 ">
            {props.loginStatus ? (
              <a href="/homepage">
                <div className="logo_website"></div>
              </a>
            ) : (
              <a href="/">
                <div className="logo_website"></div>
              </a>
            )}
          </div>
          <div className="col-6">
            <div className="container">
              {/* <form className="d-flex">
                <div className="input-group search_bar mt-3">
                  <input className="form-control search_input" type="search" placeholder="Cari di sini..." aria-label="Search" aria-describedby="button-addon2" />
                  <button className="btn search_button" id="button-addon2" type="submit">
                    <i className="bi bi-search"></i>
                  </button>
                </div>
              </form> */}
            </div>
          </div>

          {props.loginStatus ? (
            <div className="col-3">
              <div className="btn-group drop_menu">
                <button type="button" className="btn mt-3 dropdown-toggle menu_user">
                  {props.roleUser === 2 ? (
                    <a href="/daftar-jual">
                      <i className="bi bi-list-ul"></i>
                    </a>
                  ) : (
                    <a href="/daftar-beli">
                      <i className="bi bi-list-ul"></i>
                    </a>
                  )}
                </button>
              </div>

              <div className="btn-group drop_notif">
                <button type="button" className="btn mt-3 dropdown-toggle notifikasi_user" data-bs-toggle="dropdown" aria-expanded="false" onClick={handleGetNotif}>
                  <i className="bi bi-bell"></i>
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    {handleMapDataNotif()}
                  </li>
                </ul>
              </div>

              <div className="btn-group drop_profile">
                <button type="button" className="btn mt-3 dropdown-toggle profile_user" data-bs-toggle="dropdown" aria-expanded="false">
                  <i className="bi bi-person"></i>
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
            <div className="col-3">
              <a type="button" className="btn button_login mt-3" href="/auth/login">
                <span className="me-2">
                  <i className="bi bi-box-arrow-in-right"></i>
                </span>
                Masuk
              </a>
            </div>
          )}
        </div>
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

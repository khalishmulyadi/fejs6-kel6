import React, { useEffect } from "react";
import MediaQuery from "react-responsive";
// import axios from "axios";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
// import setLoginStatus from "../../redux/actions/setLoginStatus";
import getUserDetail from "../../redux/actions/getUserDetail";
import authService from "../../services/auth.service";

// css
import "./AkunSayaMobile.css";

// images
import defaultPP from "../../img/default-profile.png";

const AkunSayaMobile = (props) => {
  const navigate = useNavigate();

  const dataUser = props.dataUser;

  const loadUserDetail = async () => {
    await props.getUserDetail();
  };

  useEffect(() => {
    loadUserDetail();
  }, []);

  const handleLogout = () => {
    authService.logout();
    navigate("/auth/login");
  };

  return (
    <div className="mx-3">
      {/* {console.log(props.role)} */}
      <MediaQuery maxWidth={576}>
        {dataUser.roles == undefined ? (
          <h3 className="my-auto text-center">Loading...</h3>
        ) : (
          <div>
            {/* title start */}
            <h1 className="mt-3">Akun Saya</h1>
            {/* title end */}

            {/* foto profil start */}
            <div className="container my-5">
              {dataUser.img ? <img src={`data:image/jpeg;base64,${dataUser.img}`} className="foto_profil d-flex mx-auto" alt="foto_penjual" /> : <img src={defaultPP} className="foto_profil d-flex mx-auto" alt="foto_penjual" />}
              <h3 className="text-center mt-2">{dataUser.nama}</h3>
            </div>
            {/* foto profil end */}

            {/* list menu akun start */}
            <div>
              <ul className="list-group list_menu_akun_saya">
                <a href="update-profile">
                  <li className="list-group-item">
                    <i className="bi bi-pencil-square me-3"></i>
                    <span>Ubah Akun</span>
                  </li>
                </a>

                <a href="/#" onClick={handleLogout}>
                  <li className="list-group-item">
                    <i className="bi bi-box-arrow-right me-3"></i>
                    <span>Keluar</span>
                  </li>
                </a>
              </ul>
              <p className="text-center text-secondary mt-3">Version 1.0.0</p>
            </div>
            {/* list menu akun end */}
            {/* navigasi akun mobile start */}
            <div className="ms-2 fixed-bottom">
              <hr></hr>
              <ul className="d-flex list_navigasi_akun_saya">
                <a href="/homepage">
                  <li>
                    <i className="bi bi-house-door"></i>
                    <span>Home</span>
                  </li>
                </a>

                <a href="notifikasi">
                  <li>
                    <i className="bi bi-bell"></i>
                    <span>Notifikasi</span>
                  </li>
                </a>

                {dataUser.roles[0].idRole === 2 && (
                  <a href="tambah-product">
                    <li>
                      <i className="bi bi-plus-circle"></i>
                      <span>Jual</span>
                    </li>
                  </a>
                )}

                {dataUser.roles[0].idRole === 1 && (
                  <a href="homepage">
                    <li>
                      <i className="bi bi-cart"></i>
                      <span>Beli</span>
                    </li>
                  </a>
                )}

                {dataUser.roles[0].idRole === 2 && (
                  <a href="/daftar-jual">
                    <li>
                      <i className="bi bi-list-ul"></i>
                      <span>Daftar Jual</span>
                    </li>
                  </a>
                )}
                {props.dataUser.roles[0].idRole === 1 && (
                  <a href="/daftar-beli">
                    <li>
                      <i className="bi bi-list-ul"></i>
                      <span>Daftar Beli</span>
                    </li>
                  </a>
                )}

                <a href="akun-saya">
                  <li className="active">
                    <i className="bi bi-person"></i>
                    <span>Akun</span>
                  </li>
                </a>
              </ul>
            </div>
            {/* navigasi akun mobile end */}
          </div>
        )}
      </MediaQuery>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    dataUser: state.userReducer.dataUser,
    role: state.userReducer.role,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // setLoginStatus: () => dispatch(setLoginStatus()),
    getUserDetail: () => dispatch(getUserDetail()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AkunSayaMobile);

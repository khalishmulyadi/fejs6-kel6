import React, { useState, useEffect } from "react";
import logo from "../../img/Rectangle 127.png";
import upFoto from "../../img/upFoto.png";

import ReCAPTCHA from "react-google-recaptcha";
import { Toast, ToastContainer } from "react-bootstrap";

// redux
import { connect } from "react-redux";
import getUserDetail from "../../redux/actions/getUserDetail";
import setLoginStatus from "../../redux/actions/setLoginStatus";

// css
import "./infoprofil.css";

const InfoProfil = (props) => {
  const [updateAlert, setUpdateAlert] = useState(false);
  const [userId, setUserId] = useState(undefined);
  const [access_token, setAccessToken] = useState("");
  const [nama, setNama] = useState("");
  const [kota, setKota] = useState("");
  const [alamat, setAlamat] = useState("");
  const [noTelepon, setNoTelepon] = useState("");
  const [fotoProfil, setFotoProfil] = useState("");
  const [role, setRole] = useState([]);
  const [Gambar, setGambar] = useState(null);
  const [PrevGambar, setPrevGambar] = useState(null);
  const [verified, setVerified] = useState(false);

  function urlToFile(url, filename, mimeType) {
    return fetch(url)
      .then(function (res) {
        return res.arrayBuffer();
      })
      .then(function (buf) {
        return new File([buf], filename, { type: mimeType });
      });
  }

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));

    if (props.dataUser) {
      setAccessToken(user.access_token);
      setUserId(props.dataUser.userId ? props.dataUser.userId : "");
      setNama(props.dataUser.nama ? props.dataUser.nama : "");
      setKota(props.dataUser.kota ? props.dataUser.kota : "");
      setAlamat(props.dataUser.alamat ? props.dataUser.alamat : "");
      setNoTelepon(props.dataUser.noTelepon ? props.dataUser.noTelepon : "");
      setFotoProfil(props.dataUser.img ? props.dataUser.img : "");
      setRole(props.dataUser.roles ? props.dataUser.roles : { idRole: 1, roleName: "BUYER" });
    }
  }, [props.dataUser]);

  const getDefaultPP = () => {
    urlToFile(`data:image/png;base64,${fotoProfil}`, "foto_profile.png", "image/png").then(function (file) {
      setGambar(file);
    });
  };

  useEffect(() => {
    getDefaultPP();
  }, [userId]);

  const handleVerify = () => {
    setVerified(true);
  };

  const handleUpgradeRole = () => {
    console.log(verified);
    if (verified === true) {
      var axios = require("axios");

      var config = {
        method: "put",
        url: `https://asix-store.herokuapp.com/user/update-role/${userId}`,
        headers: {
          Authorization: `Bearer ${access_token} `,
        },
      };

      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
          alert("Kamu berhasil upgrade role!");
          window.location.replace("/update-profile");
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      alert("Harap verifikasi captcha terlebih dahulu!");
    }
  };

  const choosePicture = (e) => {
    // mengecek adakah file apa tidak
    if (e.target.files[0]) {
      // set file yang sudah ada kesalam use State
      setGambar(e.target.files[0]);
      //  inisiai untuk merender data file yang sudah di upload
      const reader = new FileReader();
      // melakukan proses render dan di simpan dalam value
      reader.addEventListener("load", () => {
        setPrevGambar(reader.result);
      });
      // melakuan render berdasrakan image yang di pilih
      reader.readAsDataURL(e.target.files[0]);
    } else {
      getDefaultPP();
    }
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    var axios = require("axios");
    var FormData = require("form-data");
    var data = new FormData();
    data.append("nama", nama);
    data.append("alamat", alamat);
    data.append("kota", kota);
    data.append("noTelepon", noTelepon);
    data.append("img", Gambar);

    var config = {
      method: "put",
      url: `https://asix-store.herokuapp.com/user/update/${userId}`,
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        alert("Data berhasil diupdate");
        window.location.replace("/update-profile");
        setUpdateAlert(true);
      })
      .catch(function (error) {
        alert("Gagal update data");
        // console.log(error);
      });
  };

  return (
    <div className="">
      <div className="container-fluid">
        <div className="headerProfil">
          <img className="logoheader" src={logo} alt="logo_app" />
          <h3 className="">Lengkapi Info Akun</h3>
        </div>
      </div>

      <div className="d-flex">
        {props.dataUser.userId === undefined ? (
          <div className="mx-auto">
            <h1 className="text-center">Loading...</h1>
          </div>
        ) : (
          <div className="mx-auto form_edit_profile pb-3">
            <div className="mt-3">
              <a href="/homepage">
                <i className="bi bi-arrow-left"></i>
              </a>
            </div>
            <form onSubmit={handleUpdateProfile}>
              {updateAlert ? (
                <ToastContainer className="p-3" position="top-end">
                  <Toast show={updateAlert} onClose={() => setUpdateAlert(false)} bg="success" delay={3000} autohide>
                    <Toast.Header>
                      <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                      <strong className="me-auto">Success</strong>
                    </Toast.Header>
                    <Toast.Body className="text-light">Berhasil update data!</Toast.Body>
                  </Toast>
                </ToastContainer>
              ) : null}
              <div className="upFoto">
                <label htmlFor="btn_upload_foto_profile" className="btn_upload_foto_profile">
                  {PrevGambar === null && (
                    <div>
                      <a>
                        {fotoProfil ? <img className="upload_foto_profil" src={`data:image;base64,${fotoProfil}`} alt="upload" /> : <img src={upFoto} className="upload_foto_profil" alt="upload" />} <p>Ganti Foto Profil</p>
                      </a>
                    </div>
                  )}
                  {PrevGambar !== null && (
                    <div>
                      <p className="alert_change_profpic">*Foto profil diganti</p>
                      <a>
                        {<img src={PrevGambar} className="upload_foto_profil" alt="upload" />}
                        <p>Ganti Foto Profil</p>
                      </a>
                    </div>
                  )}
                </label>

                <input type="file" accept="image/png , image/jpeg, image/webp" id="btn_upload_foto_profile" onChange={choosePicture} hidden />
              </div>

              <div className="mb-3">
                <label htmlFor="input_nama" className="form-label">
                  Nama*
                </label>

                <input
                  className="form-control form-control-lg"
                  id="input_nama"
                  type="text"
                  placeholder="Nama"
                  value={nama}
                  aria-label=".form-control-lg example"
                  required
                  onChange={(e) => {
                    setNama(e.target.value);
                  }}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="input_kota" className="form-label">
                  Kota*
                </label>

                <input
                  className="form-control form-control-lg"
                  id="input_kota"
                  type="text"
                  placeholder="Kota"
                  value={kota}
                  aria-label=".form-control-lg example"
                  onChange={(e) => {
                    setKota(e.target.value);
                  }}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="input_alamat" className="form-label">
                  Alamat*
                </label>
                <div className="form-floating">
                  <textarea
                    className="form-control"
                    value={alamat}
                    placeholder="Leave a comment here"
                    id="input_alamat"
                    style={{ height: "100px" }}
                    onChange={(e) => {
                      setAlamat(e.target.value);
                    }}
                    required
                  ></textarea>
                  <label htmlFor="floatingTextarea2">Contoh: Jalan Ikan Hiu 33</label>
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="input_no_hp" className="form-label">
                  No Handphone*
                </label>
                <div className="input-group">
                  <span className="input-group-text" id="basic-addon1">
                    +62
                  </span>
                  <input
                    className="form-control form-control-lg"
                    id="input_no_hp"
                    type="text"
                    value={`${noTelepon}`}
                    pattern="[0-8]{2}[0-9]{10}"

                    placeholder="contoh: 08123456789"

                    aria-label=".form-control-lg example"
                    onChange={(e) => {
                      setNoTelepon(e.target.value);
                    }}
                    required
                  />
                </div>
              </div>

              <button type="submit" className="btnsimpan">
                Simpan
              </button>
            </form>
            {props.dataUser.roles[0].idRole === 2 ? (
              <div className=" my-3">
                <p>Anda sudah menjadi seller dan dapat berjualan</p>
                <a href="/daftar-jual" className="button_already_become_seller text-center d-block my-3 py-2">
                  Mulai Berjualan
                </a>
              </div>
            ) : (
              <div className=" my-3">
                <p>Anda belum dapat menjual barang. Upgrade akun Anda agar bisa berjualan</p>
                <button className="button_upgrade_role text-center d-block w-100 my-3 py-2" onClick={handleUpgradeRole}>
                  Upgrade Jadi Penjual
                </button>
                <ReCAPTCHA sitekey="6LdvnMEgAAAAACfchNfNHLdND2D0z4f6D_ZWM0or" onChange={handleVerify} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    dataUser: state.userReducer.dataUser,
    loginStatus: state.userReducer.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setLoginStatus: () => dispatch(setLoginStatus()),
    getUserDetail: () => dispatch(getUserDetail()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InfoProfil);

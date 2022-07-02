import React, { useState, useEffect } from "react";
import logo from "../../img/Rectangle 127.png";
import upFoto from "../../img/upFoto.png";

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
  const [Gambar, setGambar] = useState(null);
  const [PrevGambar, setPrevGambar] = useState(null);

  function urlToFile(url, filename, mimeType) {
    return fetch(url)
      .then(function (res) {
        return res.arrayBuffer();
      })
      .then(function (buf) {
        return new File([buf], filename, { type: mimeType });
      });
  }

  // get user detail as default value
  useEffect(() => {
    var axios = require("axios");

    const user = JSON.parse(localStorage.getItem("user"));

    const email = JSON.parse(localStorage.getItem("email"));

    var config = {
      method: "get",
      url: `https://asix-store.herokuapp.com/user/display/${email}`,
      headers: {
        Authorization: `Bearer ${user.access_token}`,
      },
    };

    axios(config)
      .then(function (response) {
        console.log("ini response API", response.data);
        setUserId(response.data.userId);
        setAccessToken(user.access_token);
        setNama(response.data.nama);
        setKota(response.data.kota);
        setAlamat(response.data.alamat);
        setNoTelepon(response.data.noTelepon);
        setFotoProfil(response.data.img);
      })
      .catch(function (error) {
        console.log(error);
        alert(error.response.data.error_message);
        window.location.replace("/auth/login");
      });
  }, []);

  const getDefaultPP = () => {
    urlToFile(`data:image/png;base64,${fotoProfil}`, "foto_profile.png", "image/png").then(function (file) {
      setGambar(file);
    });
  };

  useEffect(() => {
    getDefaultPP();
  }, [userId]);

  if (userId !== undefined) {
    // getDefaultPP();
  }

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
        console.log(error);
      });
  };

  return (
    <div className="infoProfil mx-auto">
      {/* {getDefaultPP()} */}
      {console.log(Gambar)}
      <div className="container-fluid">
        <div className="headerProfil">
          <img className="logoheader" src={logo} alt="logo_app" />
          <h3 className="">Lengkapi Info Akun</h3>
        </div>
      </div>

      <div className="formProfil">
        <div className="back_icon">
          <a href="/#">
            <i className="bi bi-arrow-left"></i>
          </a>
        </div>

        {userId === undefined ? (
          <div>
            <h1 className="text-center">Loading...</h1>
          </div>
        ) : (
          <form className="form_edit_profile" onSubmit={handleUpdateProfile}>
            {updateAlert ? (
              <div className="alert alert-success" role="alert">
                Berhasil update profile!
              </div>
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
              {/* <select className="form-select form-select-lg mb-3" aria-label=".form-select-lg example">
              <option selected>Pilih Kota</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select> */}

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
                  // pattern="[7-9]{1}[0-9]{9}"
                  placeholder="contoh: 628123456789"
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

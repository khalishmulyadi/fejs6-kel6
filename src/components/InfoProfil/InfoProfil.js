import React, { useState, useEffect } from "react";
import logo from "../../img/Rectangle 127.png";
import upFoto from "../../img/upFoto.png";

// redux
import { connect } from "react-redux";
import getUserDetail from "../../redux/actions/getUserDetail";
// css
import "./infoprofil.css";

const InfoProfil = (props) => {
  const [userId, setUserId] = useState(undefined);
  const [nama, setNama] = useState("");
  const [kota, setKota] = useState("");
  const [alamat, setAlamat] = useState("");
  const [noTelepon, setNoTelepon] = useState("");
  const [fotoProfil, setFotoProfil] = useState("");

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
        console.log(response.data);
        setUserId(response.data.userId);
        setNama(response.data.nama);
        setKota(response.data.kota);
        setAlamat(response.data.alamat);
        setNoTelepon(response.data.nama);
        setFotoProfil(response.data.img);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <div className="infoProfil mx-auto">
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
          <form className="form_edit_profile">
            <div className="upFoto">
              <label htmlFor="customFile" className="customFile">
                <a href="/#">{fotoProfil ? <img className="upload_foto_profil" src={`data:image/jpeg;base64,${fotoProfil}`} alt="upload" /> : <img src={upFoto} className="upload_foto_profil" alt="upload" />}</a>
              </label>

              <input type="file" name="customFile" accept="image/png , image/jpeg, image/webp" id="customFile" hidden required />
            </div>

            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Nama*
              </label>

              <input
                className="form-control form-control-lg"
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
              <label htmlFor="exampleInputPassword1" className="form-label">
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
              <label htmlFor="inputState" className="form-label">
                Alamat*
              </label>
              <div className="form-floating">
                <textarea
                  className="form-control"
                  value={alamat}
                  placeholder="Leave a comment here"
                  id="floatingTextarea2"
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
              <label htmlFor="exampleInputEmail1" className="form-label">
                No Handphone*
              </label>
              <input
                className="form-control form-control-lg"
                type="text"
                value={`62${noTelepon}`}
                name="Phone Number"
                pattern="[7-9]{1}[0-9]{9}"
                placeholder="contoh: 628123456789"
                aria-label=".form-control-lg example"
                onChange={(e) => {
                  setNoTelepon(e.target.value);
                }}
                required
              />
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // setLoginStatus: () => dispatch(setLoginStatus()),
    getUserDetail: () => dispatch(getUserDetail()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InfoProfil);

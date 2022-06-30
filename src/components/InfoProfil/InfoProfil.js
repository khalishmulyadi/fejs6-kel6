import React, { useEffect } from "react";
import logo from "../../img/Rectangle 127.png";
import upFoto from "../../img/upFoto.png";

// redux
import { connect } from "react-redux";
import getUserDetail from "../../redux/actions/getUserDetail";
// css
import "./infoprofil.css";

const InfoProfil = (props) => {
  useEffect(() => {
    props.getUserDetail();
  }, []);

  return (
    <div className="infoProfil">
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

        <form className="form_edit_profile">
          <div className="upFoto">
            <label htmlFor="customFile" className="customFile">
              <a href="/#">
                <img src={upFoto} alt="upload" />
              </a>
            </label>

            <input type="file" name="customFile" accept="image/png , image/jpeg, image/webp" id="customFile" hidden required />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Nama*
            </label>
            <input className="form-control form-control-lg" type="text" placeholder="Nama" aria-label=".form-control-lg example" required />
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

            <input className="form-control form-control-lg" type="text" placeholder="Kota" aria-label=".form-control-lg example" required />
          </div>

          <div className="mb-3">
            <label htmlFor="inputState" className="form-label">
              Alamat*
            </label>
            <div className="form-floating">
              <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style={{ height: "100px" }} required></textarea>
              <label htmlFor="floatingTextarea2">Contoh: Jalan Ikan Hiu 33</label>
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              No Handphone*
            </label>
            <input className="form-control form-control-lg" type="text" name="Phone Number" pattern="[7-9]{1}[0-9]{9}" placeholder="contoh: +628123456789" aria-label=".form-control-lg example" required />
          </div>

          <button type="submit" className="btnsimpan">
            Simpan
          </button>
        </form>
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

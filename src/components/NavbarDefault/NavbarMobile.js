import React, { useState } from "react";
import "./NavbarDefault.css";
const NavbarMobile = (props) => {
  const [loggedin, setLoggedIn] = useState(false);
  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-2">
            <button className="btn button_nav_mobile" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBackdrop" aria-controls="offcanvasWithBackdrop">
              <i className="bi bi-list"></i>
            </button>
          </div>
          <div className="col-8">
            {/*<div className="container-fluid">
               <form className="d-flex">
                <div className="input-group search_bar mt-2">
                  <input className="form-control search_input" type="search" placeholder="Cari di sini..." aria-label="Search" aria-describedby="button-addon2" />
                  <button className="btn search_button" id="button-addon2" type="submit">
                    <i className="bi bi-search"></i>
                  </button>
                </div>
              </form> 
            </div>*/}
            <div>
              <h3 className="mt-3">{props.title}</h3>
            </div>
          </div>
        </div>
      </div>

      {loggedin ? (
        <div className="offcanvas offcanvas-start navbar_mobile" tabIndex="-1" id="offcanvasWithBackdrop" aria-labelledby="offcanvasWithBackdropLabel">
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasWithBackdropLabel">
              AsiX
            </h5>
            <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div className="offcanvas-body navbar_list">
            <ul className="list-group list-group-flush">
              <li className="list-group-item ">
                <a href="/#">Notifikasi</a>
              </li>
              <li className="list-group-item">
                <a href="/#">Daftar Jual</a>
              </li>
              <li className="list-group-item">
                <a href="/#">Akun Saya</a>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="offcanvas offcanvas-start navbar_mobile" tabIndex="-1" id="offcanvasWithBackdrop" aria-labelledby="offcanvasWithBackdropLabel">
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasWithBackdropLabel">
              AsiX
            </h5>
            <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div className="offcanvas-body ">
            <button type="button" className="btn button_login" onClick={(e) => setLoggedIn(true)}>
              <span className="me-2">
                <i className="bi bi-box-arrow-in-right"></i>
              </span>
              Masuk
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavbarMobile;

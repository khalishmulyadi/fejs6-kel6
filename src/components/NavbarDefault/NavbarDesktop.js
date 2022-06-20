import React, { useState } from "react";

const NavbarDesktop = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-3 mt-3 ">
            <div className="logo_website"></div>
          </div>
          <div className="col-6">
            <div className="container">
              <form className="d-flex">
                <div className="input-group search_bar mt-3">
                  <input className="form-control search_input" type="search" placeholder="Cari di sini..." aria-label="Search" aria-describedby="button-addon2" />
                  <button className="btn search_button" id="button-addon2" type="submit">
                    <i className="bi bi-search"></i>
                  </button>
                </div>
              </form>
            </div>
          </div>

          {loggedIn ? (
            <div className="col-3">
              <div className="btn-group drop_menu">
                <button type="button" className="btn mt-3 dropdown-toggle menu_user" data-bs-toggle="dropdown" aria-expanded="false">
                  <i className="bi bi-list-ul"></i>
                </button>

                <ul class="dropdown-menu dropdown-menu-end">
                  <li>
                    <a className="dropdown-item" href="/#">
                      Menu item
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/#">
                      Menu item
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/#">
                      Menu item
                    </a>
                  </li>
                </ul>
              </div>

              <div className="btn-group drop_notif">
                <button type="button" className="btn mt-3 dropdown-toggle notifikasi_user" data-bs-toggle="dropdown" aria-expanded="false">
                  <i className="bi bi-bell"></i>
                </button>
                <ul class="dropdown-menu dropdown-menu-end">
                  <li>
                    <a className="dropdown-item" href="/#">
                      Menu item
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/#">
                      Menu item
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/#">
                      Menu item
                    </a>
                  </li>
                </ul>
              </div>

              <div className="btn-group drop_profile">
                <button type="button" className="btn mt-3 dropdown-toggle profile_user" data-bs-toggle="dropdown" aria-expanded="false">
                  <i className="bi bi-person"></i>
                </button>

                <ul class="dropdown-menu dropdown-menu-end">
                  <li>
                    <a className="dropdown-item" href="/#">
                      Menu item
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/#">
                      Menu item
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/#">
                      Menu item
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="col-3">
              <button type="button" className="btn button_login mt-3">
                <span className="me-2">
                  <i className="bi bi-box-arrow-in-right"></i>
                </span>
                Masuk
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavbarDesktop;

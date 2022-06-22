import React from "react";
import CardProduct from "../../components/CardProduct/CardProduct";
import NavbarDefault from "../../components/NavbarDefault/NavbarDefault";
import Banner from "../../img/img banner.png";
import slider1 from "../../img/Rectangle 129.png";
import "./HomePage.css";
const HomePage = () => {
  return (
    <div className="container">
      <NavbarDefault />
      <div className="swiper"></div>

      <div className="">
        <h5>Telusuri Semua Kategori</h5>
        <div className="kategori-search">
          <form className="form-inline d-row">
            <div className="group_input">
              <div className="input-group-prepend">
                <button
                  className="search-btn"
                  id="button-addon2"
                  type="submit"
                >
                  <i className="bi bi-search"></i>
                </button>
              </div>
              <input
                type="text"
                className="form-control_Custom"
                placeholder="Username"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </div>
          </form>
        </div>
      </div>

      <div className="konten row row-cols-1 row-cols-md-6">
        <CardProduct />
        <CardProduct />
        <CardProduct />
        <CardProduct />
        <CardProduct />
        <CardProduct />
        <CardProduct />
      </div>
    </div>
  );
};

export default HomePage;

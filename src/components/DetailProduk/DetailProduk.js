import React from "react";
import productImage from "../../img/loginsecondhand.png";
import penjualImage from "../../img/img_photo3.jpg";
import "./DetailProduk.css";

const DetailProduk = (props) => {
  return (
    <div>
      <div className="container mx-auto detail_produk">
        <div>
          <a className="back_icon" href="/#">
            <i className="bi bi-arrow-left-short"></i>
          </a>
        </div>
        <div className="row">
          <div className="col-sm-6 p-0">
            {/* carousel gambar barang */}
            <div className="container p-0 mt-sm-5 ps-sm-3">
              <div id="carouselExampleIndicators" className="carousel slide" data-bs-touch="true" data-bs-ride="carousel">
                <div className="carousel-indicators">
                  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <img src={productImage} className="d-block w-100 carousel_img" alt="..." />
                  </div>
                  <div className="carousel-item">
                    <img src={productImage} className="d-block w-100 carousel_img" alt="..." />
                  </div>
                  <div className="carousel-item">
                    <img src={productImage} className="d-block w-100 carousel_img" alt="..." />
                  </div>
                </div>
                <button className="carousel-control-prev h-50 my-auto" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next h-50 my-auto" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            </div>
          </div>
          <div className="col-sm-6">
            {/* detail produk */}
            <div className="container mt-5 py-3 shadow product_detail">
              <h3>Gitar Yamaha</h3>
              <p>Gitar</p>
              <p>Rp. 250.000</p>

              {props.role === "merchant" && (
                <div className="d-grid gap-2">
                  <button type="button" className="btn btn_publish">
                    Terbitkan
                  </button>
                  <button type="button" className="btn btn_edit">
                    Edit
                  </button>
                </div>
              )}

              {props.role === "customer" && (
                <div className="d-grid gap-2">
                  <button type="button" className="btn btn_publish">
                    Saya tertarik dan ingin nego
                  </button>
                </div>
              )}
            </div>

            {/* detail seller */}
            <div className="container mt-3 py-3 shadow seller_detail">
              <div className="row">
                <div className="col-3">
                  <img src={penjualImage} className="img_penjual" alt="foto_penjual" />
                </div>
                <div className="col ms-3 ms-sm-0">
                  <h3>Nama Penjual</h3>
                  <p>Kota</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* deskripsi produk */}
        <div className="container w-100 mt-5 mx-auto px-4 py-3 shadow product_desc">
          <h3>Deskripsi</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DetailProduk;

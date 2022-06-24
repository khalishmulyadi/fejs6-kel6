import React, { useState } from "react";
import NavbarDefault from "../NavbarDefault/NavbarDefault";
import CardProduct from "../CardProduct/CardProduct";

import fotoPenjual from "../../img/gaeul.jpg";
import tambahProduk from "../../img/tambah_produk.png";
import kosongPeminat from "../../img/nol_peminat.png";

// css
import "./DaftarJualMobile.css";

const DaftarJualMobile = () => {
  const [tabActive, setTabActive] = useState(1);
  const [produkMinat, setProdukMinat] = useState(0);
  const [produkTerjual, setProdukTerjual] = useState(4);

  return (
    <div>
      <NavbarDefault title={"Daftar Jual"} />

      {/* Profil penjual dan edit start*/}
      <div className="container mt-3 py-3 shadow seller_detail">
        <div className="row align-items-center">
          <div className="col-3">
            <img src={fotoPenjual} className="img_penjual" alt="foto_penjual" />
          </div>
          <div className="col-6">
            <h3>Nama Penjual</h3>
            <p>Kota</p>
          </div>
          <div className="col-3">
            <a href="/#" className="btn btn_edit_profil_daftar_jual">
              Edit
            </a>
          </div>
        </div>
      </div>
      {/* Profil penjual dan edit end */}

      {/* button tab start */}
      <div className="btn_tab_daftar_jual_mobile container mt-4">
        <button className={`btn btn_tab_produk btn-lg mx-3 ${tabActive === 1 && "active"}`} onClick={(e) => setTabActive(1)}>
          <span className="me-2">
            <i className="bi bi-box"></i>
          </span>
          Produk
        </button>

        <button className={`btn btn_tab_diminati btn-lg mx-3 ${tabActive === 2 && "active"}`} onClick={(e) => setTabActive(2)}>
          <span className="me-2">
            <i className="bi bi-heart"></i>
          </span>
          Diminati
        </button>

        <button className={`btn btn_tab_terjual btn-lg mx-3 ${tabActive === 3 && "active"}`} onClick={(e) => setTabActive(3)}>
          <span className="me-2">
            <i className="bi bi-currency-dollar"></i>
          </span>
          Terjual
        </button>
      </div>
      {/* button tab end */}

      {/* content start */}

      {/* content produk start */}

      {tabActive === 1 && (
        <div className="container">
          <div className="row row-cols-2">
            <a href="/#">
              <img src={tambahProduk} className="btn_tambah_produk col" alt="tambah_produk" />
            </a>
            <div className="col">
              <CardProduct />
            </div>
            <div className="col">
              <CardProduct />
            </div>
            <div className="col">
              <CardProduct />
            </div>
            <div className="col">
              <CardProduct />
            </div>
            <div className="col">
              <CardProduct />
            </div>
          </div>
        </div>
      )}

      {/* content produk end */}

      {/* content diminati start */}

      {tabActive === 2 &&
        (produkMinat > 0 ? (
          <div className="container">
            <div className="row row-cols-2">
              <div className="col">
                <CardProduct />
              </div>
              <div className="col">
                <CardProduct />
              </div>
              <div className="col">
                <CardProduct />
              </div>
              <div className="col">
                <CardProduct />
              </div>
              <div className="col">
                <CardProduct />
              </div>
            </div>
          </div>
        ) : (
          <div>
            <img src={kosongPeminat} className="kosong_peminat" alt="kosong_peminat" />
          </div>
        ))}

      {/* content diminati end */}

      {/* content terjual start */}

      {tabActive === 3 &&
        (produkTerjual > 0 ? (
          <div className="container">
            <div className="row row-cols-2">
              <div className="col">
                <CardProduct />
              </div>
              <div className="col">
                <CardProduct />
              </div>
              <div className="col">
                <CardProduct />
              </div>
              <div className="col">
                <CardProduct />
              </div>
              <div className="col">
                <CardProduct />
              </div>
            </div>
          </div>
        ) : (
          <div>
            <img src={kosongPeminat} className="kosong_peminat" alt="kosong_peminat" />
          </div>
        ))}

      {/* content terjual end */}

      {/* content end */}
    </div>
  );
};

export default DaftarJualMobile;

import React from "react";

import productImg from "../../img/produk.png";

import "./Notifikasi.css";

const Notifikasi = () => {
  return (
    <div>
      <div className="notifikasi">
        <div className="row">
          <div className="col-2">
            <img src={productImg} className="gambar_produk_notif" alt="gambar_produk" />
          </div>
          <div className="col-7">
            <p className="status_notifikasi mb-0">Penawaran produk</p>
            <p className="mb-0">Jam Tangan Casio</p>
            <p className="mb-0">Rp 250.000</p>
            <p className="mb-0">Ditawar Rp 200.000</p>
          </div>
          <div className="col-3">
            <p className="waktu_notifikasi">20 Apr, 14:04</p>
          </div>
        </div>
        <hr></hr>
      </div>
    </div>
  );
};

export default Notifikasi;
